
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { FormikErrors, useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { EndpointValidationError } from '@hilla/frontend';
import { DatePicker } from '@hilla/react-components/DatePicker.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import Pet from 'Frontend/generated/com/petclinic/application/data/entity/owner/Pet';
import Visit from 'Frontend/generated/com/petclinic/application/data/entity/owner/Visit';
import { VisitEndpoint } from 'Frontend/generated/endpoints';
import { formatDateIso8601 } from 'Frontend/themes/hilla-pet-clinic/utils';
import { useParams } from 'react-router-dom';

export default function PetVisitForm(props: any) {
    const [selectedPet, setSelectedPet] = useState({} as Pet);
    const { ownerId } = useParams();
    // set form initial values
    let formInitialValues: any = {
        date: '', description: ''
    }
    useEffect(() => {
        setSelectedPet(props);
    }, [props]);

    //  reset page state after submitting form
    const onDataSave = (data: Owner) => {
        props.onDataSaved(data);
    };
    let formik: any = useFormik({
        initialValues: formInitialValues,
        onSubmit: async (values: Visit, { setSubmitting, setErrors, setStatus }) => {
            try {
                let vistFormValues: any = {};
                vistFormValues.date = formatDateIso8601(values.date);
                vistFormValues.description = values.description;
                // add pet visit 
                const _owner: any = await VisitEndpoint.processNewVisitForm(Number(ownerId), selectedPet.id!, vistFormValues) ?? values;
                onDataSave(_owner);
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
            <VerticalLayout theme="spacing" className='align-center'>
                <TextField
                    style={{ width: "30%" }}
                    name="description"
                    label="Description"
                    placeholder=""
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.description}
                    invalid={formik.errors.description ? true : false}
                ></TextField>

                <DatePicker style={{ width: "30%" }}
                    label="Date"
                    name="date"
                    placeholder="mm/dd/yyyy"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.date}
                    invalid={formik.errors.date ? true : false}
                />

                <Button theme="primary" onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >Save</Button>
            </VerticalLayout>
        </>
    );
}