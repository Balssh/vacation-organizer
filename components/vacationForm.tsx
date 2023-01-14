import { Formik, Field, Form, FormikHelpers } from "formik";
import { Vacation } from "../interfaces/interfaces";
import type { User } from "firebase/auth";
import { FC } from "react";

const VacationForm: FC<{ currentUser: User }> = ({ currentUser }) => {
  return (
    <div>
      <h1 className="text-2xl">Vacation Form</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          ownerID: currentUser?.uid,
          cost: 0,
          location: "",
          participants: "",
        }}
        onSubmit={(
          values: Vacation,
          { setSubmitting }: FormikHelpers<Vacation>
        ) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <br />
          <Field id="name" name="name" placeholder="Vacation name" />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <Field
            id="description"
            name="description"
            placeholder="Vacation description"
          />
          <br />
          <label htmlFor="cost">Cost</label>
          <br />
          <Field id="cost" name="cost" placeholder="Vacation cost" />
          <br />
          <label htmlFor="location">Location</label>
          <br />
          <Field
            id="location"
            name="location"
            placeholder="Vacation location"
          />
          <br />
          <label htmlFor="participants">Participants</label>
          <br />
          <Field
            id="participants"
            name="participants"
            placeholder="Participants"
          />
          <br />
          <button className="mt-2 border border-zinc-900" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default VacationForm;
