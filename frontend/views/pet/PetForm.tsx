import { EndpointValidationError } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { Select, SelectItem } from '@hilla/react-components/Select.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import Pet from 'Frontend/generated/com/petclinic/application/data/entity/owner/Pet';
import PetType from 'Frontend/generated/com/petclinic/application/data/entity/owner/PetType';
import { PetEndpoint } from 'Frontend/generated/endpoints';
import { formatDateIso8601 } from 'Frontend/themes/hilla-pet-clinic/utils';
import { FormikErrors, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function PetForm() {
    const [petTypesDropdownData, setPetTypesDropdownData] = useState([] as Array<SelectItem>);
    const [petTypesData, setPetTypesData] = useState([] as Array<PetType>);
    const [owner, setOwner] = useState({} as Owner);
    const location = useLocation();
    const { petId } = useParams();
    const navigete = useNavigate();
    let _owner = location.state;

    // get pet types dropdown data
    const fetchPetTypes = async () => {
        let petTypeApiData = await PetEndpoint.populatePetTypes();
        let types = JSON.parse(JSON.stringify(petTypeApiData))
        types = types.map((type: PetType) => { return { label: type.name, value: type.name } });
        setPetTypesDropdownData(types);
        setPetTypesData(petTypeApiData as Array<PetType>);

    }
    useEffect(() => {
        setOwner(_owner);
        fetchPetTypes();
    }, []);

    let selectedPet = _owner.id &&
        petId && _owner.pets.filter((pet: Pet) => pet.id === Number(petId))[0];
    let formInitialValues: any = {
        name: selectedPet ? selectedPet.name : '', birthDate: selectedPet ? selectedPet.birthDate : '',
        type: selectedPet ? selectedPet.type.name : ''
    }
    //  reset page state after submitting form
    const onDataSave = (data: Owner) => {
        navigete(`/owner/details/${_owner.id}`);
    };
    let formik: any = useFormik({
        initialValues: formInitialValues,
        onSubmit: async (values: Pet, { setSubmitting, setErrors, setStatus }) => {
            try {
                if (petId) {
                    let pet = owner.pets && owner.pets.filter((pet: any) => pet.id = Number(petId))[0];
                    pet ? pet.name = values.name : '';
                    pet ? pet.birthDate = formatDateIso8601(values.birthDate) : '';
                    pet ? pet.type = petTypesData.filter((type: any) => type.name === values.type)[0] : '';
                    // update pet details params as Pet pet, Owner owner
                    const _owner: any = await PetEndpoint.processUpdateForm(pet, owner) ?? values;
                    onDataSave(_owner);
                } else {
                    let petForm: any = { name: values.name };
                    const petType = petTypesData.filter((type: any) => type.name === values.type);
                    petForm['type'] = petType.length > 0 ? petType[0] : ''
                    petForm['birthDate'] = formatDateIso8601(values.birthDate);
                    const _owner: Owner = await PetEndpoint.processPetCreationForm(owner, petForm) ?? values;
                    onDataSave(_owner);
                }

                formik.resetForm();
            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<Owner> = {};
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && (error.parameterName in formInitialValues)) {
                            const key = error.parameterName as string & keyof Owner;
                            errors[key] = error.message.substring(error.message.indexOf("validation error:"));
                        }
                    }
                    setErrors(errors);
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>

            {owner && owner.id && <VerticalLayout theme="spacing" style={{alignItems:'center'}}>

                    <h3>Owner Name</h3>
                    <h4>{owner.firstName + ' ' + owner.lastName}</h4>
                <TextField
                    style={{ width: "30%" }}
                    name="name"
                    label="Name"
                    placeholder="Charlie"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.name}
                    invalid={formik.errors.name ? true : false}
                ></TextField>

                <DatePicker style={{ width: "30%" }}
                    label="Birth date"
                    name="birthDate"
                    placeholder="mm/dd/yyyy"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.birthDate}
                    invalid={formik.errors.birthDate ? true : false}
                />

                {<Select style={{ width: "30%" }}
                    label="Type"
                    name='type'
                    placeholder='cat'
                    items={petTypesDropdownData}
                    errorMessage={formik.errors.type}
                    onChange={formik.handleChange}
                    invalid={formik.errors.type ? true : false}
                    value={formik.values.type}
                />}
                <Button theme="primary" onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >Save</Button>
            </VerticalLayout>
            }
        </>
    );
}