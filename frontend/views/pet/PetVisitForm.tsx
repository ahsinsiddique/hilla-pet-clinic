
import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';

import { EndpointValidationError } from '@hilla/frontend';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import { PetEndpoint, VisitEndpoint } from 'Frontend/generated/endpoints';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { DatePicker } from '@hilla/react-components/DatePicker.js';

import Visit from 'Frontend/generated/com/petclinic/application/data/entity/owner/Visit';
import { formatDateIso8601 } from 'Frontend/themes/hilla-pet-clinic/utils';

export default function PetVisitForm(props: any) {
    const [owner, setOwner] = useState({} as Owner | any);

    // set form initial values
    let formInitialValues: any = {
        date: '', description: ''
    }
    useEffect(() => {
        let owner = JSON.parse(JSON.stringify(props));
        if (owner && owner.pets && !owner.hasOwnProperty('selectedPetId')) {
            owner['selectedPetId'] = owner.pets && owner.pets[0].id;
        }
        setOwner(owner);
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
                const _owner: any = await VisitEndpoint.processNewVisitForm(owner, owner.selectedPetId, vistFormValues) ?? values;
                _owner.selectedPetId = owner.selectedPetId;
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