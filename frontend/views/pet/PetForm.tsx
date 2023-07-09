
import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';

import { EndpointValidationError } from '@hilla/frontend';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import { PetEndpoint } from 'Frontend/generated/endpoints';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Select } from '@hilla/react-components/Select.js';
import { DatePicker, DatePickerDate } from '@hilla/react-components/DatePicker.js';
import PetType from 'Frontend/generated/com/petclinic/application/data/entity/owner/PetType';
import Pet from 'Frontend/generated/com/petclinic/application/data/entity/owner/Pet';
import dateFnsFormat from 'date-fns/format';

export default function PetForm(props: any) {
    const [petTypesDropdownData, setPetTypesDropdownData] = useState([] as Array<PetType> | any);
    const [petTypesData, setPetTypesData] = useState([] as Array<PetType> | any);
    const [owner, setOwner] = useState({} as Owner);
    let formInitialValues: any = {
        name: '', birthDate: '', type: ''
    }
    const fetchPetTypes = async () => {
        let petTypeApiData = await PetEndpoint.populatePetTypes();
        let types = JSON.parse(JSON.stringify(petTypeApiData))
        types = types.map((type: any) => { return { label: type.name, value: type.name } })
        setPetTypesDropdownData(types);
        setPetTypesData(petTypeApiData);

    }
    useEffect(() => {
        setOwner(props[0]);
        fetchPetTypes();
        //   formInitialValues = props[0];
    }, [props]);

    let formik: any = useFormik({
        initialValues: formInitialValues,
        onSubmit: async (values: Pet, { setSubmitting, setErrors, setStatus }) => {
            try {
                // if (props && props[0]) {
                let petForm: any = { name: values.name };
                const petType = petTypesData.filter((type: any) => type.name === values.type);

                petForm['type'] = petType[0];
                petForm['birthDate'] = formatDateIso8601(values.birthDate);
                (await PetEndpoint.processPetCreationForm(owner, petForm)) ?? values;
                // }
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

    const formatDateIso8601 = (dateParts: any): string => {
        const date = new Date(dateParts);
        return dateFnsFormat(date, 'yyyy-MM-dd');
    };

    return (
        <>  
         <div className='mt-1 container'>
            <h3>Owner Name</h3> 
            <h4 className='ml-1'>{owner.firstName + ' ' + owner.lastName}</h4>
        </div>
            <VerticalLayout theme="spacing" className='align-center'>
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

        </>
    );
}