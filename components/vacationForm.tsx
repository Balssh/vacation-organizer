import { Formik, Field, Form, FormikHelpers, FieldArray } from "formik";
import { Vacation } from "../interfaces/interfaces";
import { FC } from "react";
import { updateVacation } from "../firebase/firebaseApp";
import { addVacation } from "../firebase/firebaseApp";
import { useRouter } from "next/router";

const VacationForm: FC<{
  toggleVacationForm: () => void;
  operationFlag: string;
  initialValues: Vacation;
}> = ({ toggleVacationForm, operationFlag, initialValues }) => {
  const router = useRouter();
  return (
    <div className="border border-zinc-900 p-2">
      <h1 className="text-2xl">Vacation Form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: Vacation,
          { setSubmitting }: FormikHelpers<Vacation>
        ) => {
          // alert(JSON.stringify(values, null, 2));
          if (operationFlag === "add") {
            await addVacation(values);
          } else if (operationFlag === "edit") {
            await updateVacation(values, initialValues.id!);
          }
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
              min="0"
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
              {({ remove, push }) => (
                <div className="border border-zinc-900">
                  {values.participants.length > 0 &&
                    values.participants.map((participant, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-start justify-start space-x-2 "
                      >
                        <Field
                          name={`participants.${index}.name`}
                          placeholder="Name"
                        />
                        <div className="space-x-2">
                          <label htmlFor={`participants.${index}.paid`}>
                            Paid?
                          </label>
                          <Field
                            type="checkbox"
                            name={`participants.${index}.paid`}
                          />
                        </div>
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", paid: false })}
                  >
                    Add
                  </button>
                </div>
              )}
            </FieldArray>
            <br />
            <div className="flow-root">
              <button
                className="float-left border border-zinc-900 p-2 hover:bg-red-400"
                type="submit"
              >
                Submit
              </button>
              <button
                className="float-right border border-zinc-900 p-2 hover:bg-red-400"
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
