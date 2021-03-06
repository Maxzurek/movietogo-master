import { Formik, FormikHelpers } from "formik";
import { UserCreationDTO } from "../../models/authentication.models";
import * as Yup from "yup";
import { Button, Form, Segment } from "semantic-ui-react";
import CustomFormField from "../utilities/CustomFormField";

interface RegisterFormProps {
    model: UserCreationDTO;
    onSubmit(values: UserCreationDTO, actions: FormikHelpers<UserCreationDTO>): void;
    formId?: string;
    className?: string;
}

export default function RegisterForm(props: RegisterFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object(
                    {
                        email: Yup.string().required('This field is required').email('Please enter a valid email'),
                        userName: Yup.string().required('This field is required'),
                        password: Yup.string().required('This field is required'),
                        confirmPassword: Yup.string().required('This field is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
                    })}
        >
            {formikProps => (
                <Form id={props.formId} onSubmit={formikProps.handleSubmit} className={props.className}>
                    <CustomFormField
                        value={formikProps.values.email}
                        field="email"
                        displayName="Email"
                        formikProps={formikProps}
                        size='large'
                        icon="mail"
                    />
                    <CustomFormField
                        value={formikProps.values.userName}
                        field="userName"
                        displayName="Username"
                        formikProps={formikProps}
                        size='large'
                        icon="user outline"
                    />
                    <CustomFormField
                        value={formikProps.values.password}
                        field="password"
                        displayName="Password"
                        type="password"
                        formikProps={formikProps}
                        size='large'
                        icon="lock"
                    />
                    <CustomFormField
                        value={formikProps.values.confirmPassword}
                        field="confirmPassword"
                        displayName="Confirm password"
                        type="password"
                        formikProps={formikProps}
                        size='large'
                        icon="lock"
                    />
                    <Segment basic>
                        <Button
                            color='green'
                            inverted type='submit'
                            icon='checkmark'
                            content='Register'
                            fluid
                            {...(formikProps.isSubmitting ? { loading: true } : undefined)}
                        />
                    </Segment>
                </Form>

            )}
        </Formik>
    )
};
