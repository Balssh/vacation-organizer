import { initializeFirebase, getVacations } from "../../firebase/firebaseApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VacationForm from "../../components/vacationForm";
const User = () => {
  const app = initializeFirebase();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [showVacationForm, setShowVacationForm] = useState(false);

  useEffect(() => {
    if (!user) {
      void router.push("/login");
    }
  }, [user]);

  const toggleVacationForm = () => {
    setShowVacationForm(!showVacationForm);
  };
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
            {showVacationForm ? (
              <div className="space-y-2">
                <VacationForm currentUser={user!} />
                <div className="flex">
                  <button
                    className="border border-zinc-900 p-2 text-base hover:bg-red-400"
                    onClick={toggleVacationForm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex">
                <button
                  className="border border-zinc-900 p-2 text-base hover:bg-red-400"
                  onClick={toggleVacationForm}
                >
                  Add Vacation
                </button>
              </div>
            )}
            <div className="flex">
              <button
                className="border border-zinc-900 p-2 text-base hover:bg-red-400"
                onClick={getVacations}
              >
                Show my vacations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
