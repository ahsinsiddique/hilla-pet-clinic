
import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';

import { EndpointValidationError } from '@hilla/frontend';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import { PetEndpoint } from 'Frontend/generated/endpoints';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Select } from '@hilla/react-components/Select.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import PetType from 'Frontend/generated/com/petclinic/application/data/entity/owner/PetType';

export default function PetForm(props: any) {
    const [petTypes, setPetTypes] = useState([] as Array<PetType> | any);
    let ownerInitialValues = props[0] ? props[0] : {
        name: '', birthDate: '', type: ''
    }

    const fetchPetTypes = async () => {
        const types: any = await PetEndpoint.populatePetTypes();
        const data = types.map((type: any) => { return { label: type.name, value: type.name } })
        setPetTypes(data);

    }
    useEffect(() => {
        fetchPetTypes();
        ownerInitialValues = props[0];
    }, [props]);

    let formik: any = useFormik({
        initialValues: ownerInitialValues,
        onSubmit: async (values: Owner, { setSubmitting, setErrors, setStatus }) => {
            try {
                // if (props && props[0]) {
                //     (await OwnerEndpoint.initUpdateOwnerForm(values)) ?? values;
                // }
                formik.resetForm();
            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<Owner> = {};
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && (error.parameterName in ownerInitialValues)) {
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
            <VerticalLayout theme="spacing" style={{ alignItems: 'center', }}>
                <TextField
                    style={{ width: "20%" }}
                    name="name"
                    label="Name"
                    placeholder="Charlie"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.name}
                    invalid={formik.errors.name ? true : false}
                ></TextField>

                <DatePicker style={{ width: "20%" }}
                    label="Birth date"
                    name="birthDate"
                    placeholder="mm/dd/yyyy"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.birthDate}
                    invalid={formik.errors.birthDate ? true : false}
                />

                {<Select style={{ width: "20%" }}
                    label="Type"
                    name='type'
                    placeholder='cat'
                    items={petTypes}
                    errorMessage={formik.errors.type}
                    invalid={formik.errors.type ? true : false}
                    value={petTypes && petTypes[0]?.name}
                />}
                <Button theme="primary" onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >Save</Button>
            </VerticalLayout>

        </>
    );
}