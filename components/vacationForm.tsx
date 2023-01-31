import { Formik, Field, Form, FormikHelpers, FieldArray } from "formik";
import { Vacation } from "../interfaces/interfaces";
import { User } from "firebase/auth";
import { FC } from "react";
import { addVacation } from "../firebase/firebaseApp";

const VacationForm: FC<{
  currentUser: User;
  toggleVacationForm: () => void;
}> = ({ currentUser, toggleVacationForm }) => {
  return (
    <div className="border border-zinc-900 p-2">
      <h1 className="text-2xl">Vacation Form</h1>
      <Formik
        initialValues={{
          name: "",
          completed: false,
          cost: 0,
          location: "",
          ownerID: currentUser.uid,
          participants: [{ name: "", paid: false }],
        }}
        onSubmit={async (
          values: Vacation,
          { setSubmitting }: FormikHelpers<Vacation>
        ) => {
          alert(JSON.stringify(values, null, 2));
          await addVacation(values);
          setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form>
            <label htmlFor="name">Name</label>
            <br />
            <Field id="name" name="name" placeholder="Vacation name" />
            <br />
            <label htmlFor="cost">Cost</label>
            <br />
            <Field
              type="number"
              id="cost"
              name="cost"
              placeholder="Vacation cost"
            />
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
            <FieldArray name="participants">
              {({ insert, remove, push }) => (
                <div>
                  {values.participants.length > 0 &&
                    values.participants.map((participant, index) => (
                      <div key={index}>
                        <Field name={`participants.${index}.name`} />
                        <br />
                        <Field
                          type="checkbox"
                          name={`participants.${index}.paid`}
                        />
                        <button type="button" onClick={() => remove(index)}>
                          x
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", paid: false })}
                  >
                    add
                  </button>
                </div>
              )}
            </FieldArray>
            <br />
            <div className="flow-root">
              <button
                className="float-left mt-2 border border-zinc-900 hover:bg-red-400"
                type="submit"
              >
                Submit
              </button>
              <button
                className="float-right mt-2 border border-zinc-900 hover:bg-red-400"
                onClick={toggleVacationForm}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VacationForm;
