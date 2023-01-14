import { initializeFirebase } from "../../firebase/firebaseApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import VacationForm from "../../components/vacationForm";
const User = () => {
  const app = initializeFirebase();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      void router.push("/login");
    }
  }, [user]);
  // console.log(user);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="my-5 grid grid-cols-12 content-evenly gap-2 px-5">
          <div className="col-span-8 col-start-3 flex items-center justify-center rounded-md border border-zinc-900 bg-teal-50">
            <h5 className=" text-3xl">Welcome, {user?.displayName}!</h5>
          </div>
          <div className="col-span-8 col-start-3 space-y-2 rounded-md border border-zinc-900 bg-teal-50 p-4">
            <VacationForm currentUser={user!} />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
