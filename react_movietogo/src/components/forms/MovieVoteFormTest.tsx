import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Segment, Button, Form } from "semantic-ui-react";
import CustomFormField from "../utilities/CustomFormField";
import { MovieVoteCreationDTO } from "../../models/movievotes.models";

interface MovieVoteFormTestProps{
    model: MovieVoteCreationDTO;
    onSubmit(values: MovieVoteCreationDTO, actions: FormikHelpers<MovieVoteCreationDTO>): void;
}

export default function MovieVoteFormTest(props: MovieVoteFormTestProps) {
    return(
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object(
                    {
                        vote: Yup.number().typeError("Must be a number").min(-1, "Minimum atleast -1").max(1, "Allowed maximum is 1").required('This field is required'),
                        movieId: Yup.number().typeError("Must be a number").required('This field is required'),
                    })}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit} >
                    <CustomFormField
                        field="vote"
                        displayName="Vote"
                        type="number"
                        value={formikProps.values.vote}
                        formikProps={formikProps}
                        size='large'
                    />
                    <CustomFormField
                        field="movieId"
                        displayName="Movie Id"
                        type="number"
                        value={formikProps.values.vote}
                        formikProps={formikProps}
                        size='large'
                    />
                    <Segment basic>
                        <Button
                            color='green'
                            inverted type='submit'
                            icon='unlock'
                            content='Submit Vote'
                            fluid
                            {...(formikProps.isSubmitting ? { loading: true } : undefined)}
                        />
                    </Segment>
                </Form>
            )}
        </Formik>
    )
};
