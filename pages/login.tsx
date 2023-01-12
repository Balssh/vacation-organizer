import Link from "next/link";
import { initializeFirebase } from "../firebase/firebaseApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Login = () => {
  const app = initializeFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <div>Pla Pizda</div>;
  }
  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };
  // console.log(app);
  return (
    <div className="my-5 grid grid-cols-12 content-evenly gap-2 px-5">
      <div className="col-span-8 col-start-3 flex items-center justify-center rounded-md border border-zinc-900 bg-teal-50">
        <h5 className=" text-3xl">Login Page</h5>
      </div>
      <div className="col-span-8 col-start-3 space-y-2 rounded-md border border-zinc-900 bg-teal-50 p-4">
        <div className="flex justify-center">
          <button
            className="border border-zinc-900 p-2 text-2xl hover:bg-red-400"
            onClick={signIn}
          >
            Sign in with Google
          </button>
        </div>
        <div className="flex justify-center">
          <button className="border border-zinc-900 p-2 text-2xl hover:bg-red-400">
            <Link href={"/register"}>Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
