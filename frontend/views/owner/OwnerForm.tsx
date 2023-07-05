
import { useEffect } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';

import { EndpointValidationError } from '@hilla/frontend';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import { OwnerEndpoint } from 'Frontend/generated/endpoints';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { EmailField } from '@hilla/react-components/EmailField.js';

export default function OwnerForm(props: any) {
    let ownerInitialValues = props[0] ? props[0] : {
        firstName: '', lastName: '', address: '',
        city: '', telephone: '', email: '', type: '', new: true, version: 1, id: 1
    }

    const onDataSave = (data: Owner) => {
        props.onDataSaved(data);
    };
    useEffect(() => {
        ownerInitialValues = props[0];
    }, [props]);

    let formik: any = useFormik({
        initialValues: ownerInitialValues,
        onSubmit: async (values: Owner, { setSubmitting, setErrors, setStatus }) => {
            try {
                console.log(values)
                if (props && props[0]) {
                    (await OwnerEndpoint.initUpdateOwnerForm(values)) ?? values;

                    onDataSave(values);
                } else {
                    const saved = (await OwnerEndpoint.processCreationForm(values)) ?? values;
                }
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
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.firstName}
                    invalid={formik.errors.firstName ? true : false}
                ></TextField>
                <TextField label="Last Name" style={{ width: "20%" }}
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.lastName}
                    placeholder="Last Name"
                    invalid={formik.errors.lastName ? true : false}
                />

                <EmailField
                    name="email"
                    label="Email address"
                    placeholder='john@gmail.com'
                    value={formik.values.email}
                    errorMessage="Enter a valid email address"
                    clearButtonVisible
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    style={{ width: "20%" }}
                    invalid={formik.errors.email ? true : false}

                />
                <TextField label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.address}
                    style={{ width: "20%" }}
                    placeholder="23 st,block 2, NY"
                    invalid={formik.errors.address ? true : false}
                />

                <TextField label="City" style={{ width: "20%" }}
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.city}
                    placeholder="city"
                    invalid={formik.errors.city ? true : false}
                />

                <TextField label="Telephone"
                    name="telephone"
                    style={{ width: "20%" }}
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.telephone}
                    placeholder="Telephone"
                    invalid={formik.errors.telephone ? true : false}
                />
                {/* <Select style={{ width: "20%" }}
                    label="Type"
                    name='type'
                    items={criteria}
                    errorMessage={formik.errors.type}
                    invalid={formik.errors.telephone ? true : false}
                    value={criteria && criteria[0]?.value}
                /> */}
                <Button theme="primary" onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >Save</Button>
            </VerticalLayout>

        </>
    );
}