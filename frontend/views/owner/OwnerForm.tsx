
import { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Button } from '@hilla/react-components/Button.js';
import { TextField } from '@hilla/react-components/TextField.js';

import { EndpointValidationError } from '@hilla/frontend';
import Owner from 'Frontend/generated/com/petclinic/application/data/entity/owner/Owner';
import { OwnerEndpoint } from 'Frontend/generated/endpoints';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Select } from '@hilla/react-components/Select.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { criteria } from './OwnerCRUD';

export default function OwnerForm() {
    const ownerInitialValues = { firstName: '', lastName: '', address: '', city: '', telephone: '' }
    const [owners, setOwners] = useState(Array<Owner>());

    useEffect(() => {
        (async () => {
            let data: any = await OwnerEndpoint.getOwners();
            setOwners(data);
        })();
    }, []);

    const formik: any = useFormik({
        initialValues: ownerInitialValues,
        onSubmit: async (value: Owner | any, { setSubmitting, setErrors }) => {
            try {
                console.log(value)
                debugger
                const saved = (await OwnerEndpoint.processCreationForm(value)) ?? value;
                //   setTodos([...todos, saved]);
                formik.resetForm();
            } catch (e: unknown) {
                if (e instanceof EndpointValidationError) {
                    const errors: FormikErrors<Owner> = {};
                    for (const error of e.validationErrorData) {
                        if (typeof error.parameterName === 'string' && !(error.parameterName in ownerInitialValues)) {
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
                    invalid={formik.errors.task ? true : false}
                ></TextField>
                <TextField label="Last Name" style={{ width: "20%" }}
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.lastName}
                    placeholder="Last Name" />

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
                />
                <TextField label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.address}
                    style={{ width: "20%" }}
                    placeholder="23 st,block 2, NY" />

                <TextField label="City" style={{ width: "20%" }}
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.city}
                    placeholder="city" />

                <TextField label="Telephone"
                    name="telephone"
                    style={{ width: "20%" }}
                    value={formik.values.telephone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleChange}
                    errorMessage={formik.errors.telephone}
                    placeholder="Telephone" />
                <Select style={{ width: "20%" }}
                    label="Type"
                    items={criteria}
                    value={criteria && criteria[0]?.value}
                />
                <Button theme="primary" onClick={formik.submitForm}
                    disabled={formik.isSubmitting}
                >Save</Button>
            </VerticalLayout>

        </>
    );
}