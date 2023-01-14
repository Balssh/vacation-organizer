import Link from "next/link";
import { initializeFirebase } from "../firebase/firebaseApp";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { LoginUser } from "../interfaces/interfaces";

const Login = () => {
  const app = initializeFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (user) {
    router.push(`/users/${user.uid}`);
  }
  const signInGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  const signInEmail = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result.user);
  };
  // console.log(app);
  return (
    <div className="my-5 grid grid-cols-12 content-evenly gap-2 px-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="col-span-8 col-start-3 flex items-center justify-center rounded-md border border-zinc-900 bg-teal-50">
            <h5 className=" text-3xl">Login Page</h5>
          </div>
          <div className="col-span-8 col-start-3 space-y-2 rounded-md border border-zinc-900 bg-teal-50 p-4">
            <div className="flex justify-center">
              <button
                className="border border-zinc-900 p-2 text-2xl hover:bg-red-400"
                onClick={signInGoogle}
              >
                Sign in with Google
              </button>
            </div>
            <div className="inline-flex w-full items-center justify-center">
              <hr className="my-4 h-px w-full border-0 bg-gray-200" />
              <span className="text-gray-90 absolute left-1/2 -translate-x-1/2 bg-teal-50 px-3 font-medium">
                or
              </span>
            </div>
            <div className="border border-zinc-900 p-4">
              <Formik
                initialValues={{
                  email: "test@gmail.com",
                  password: "test123",
                }}
                onSubmit={(
                  values: LoginUser,
                  { setSubmitting }: FormikHelpers<LoginUser>
                ) => {
                  signInEmail(values.email, values.password);
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }}
              >
                <Form>
                  <label htmlFor="email">Email</label>
                  <br />
                  <Field
                    id="email"
                    name="email"
                    placeholder="test@gmail.com"
                    type="email"
                  />
                  <br />
                  <label htmlFor="password">Password</label>
                  <br />
                  <Field id="password" name="password" placeholder="test123" />
                  <br />
                  <button className="mt-2 border border-zinc-900" type="submit">
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
            <hr />
            <div className="flex justify-center space-x-1">
              <span>Don't have an account?</span>
              <Link href={"/register"}> Register</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
