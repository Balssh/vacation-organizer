import { initializeFirebase, getVacations } from "../../firebase/firebaseApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VacationForm from "../../components/vacationForm";
import VacationBox from "../../components/vacationBox";
import { Vacation } from "../../interfaces/interfaces";

// TODO: Change the data fetching to use getServersideProps

const User = () => {
  const app = initializeFirebase();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [showVacationForm, setShowVacationForm] = useState(false);
  const [showVacations, setShowVacations] = useState(false);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [initialVacationValues, setInitialVacationValues] =
    useState<Vacation>();

  useEffect(() => {
    if (!user) {
      void router.push("/login");
    } else {
      setInitialVacationValues({
        name: "",
        completed: false,
        cost: 0,
        location: "",
        ownerID: user.uid,
        participants: [{ name: "", paid: false }],
      });
    }
  }, [user]);

  const toggleVacationForm = () => {
    setShowVacationForm(!showVacationForm);
  };
  const toggleShowVacations = () => {
    setShowVacations(!showVacations);
  };

  const handleGetVacations = async () => {
    const data = await getVacations();
    setVacations(data);
    toggleShowVacations();
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="my-5 grid grid-cols-12 content-evenly gap-2 px-5">
          <div className="col-span-8 col-start-3 flex items-center justify-center rounded-md border border-zinc-900 bg-teal-50 py-1">
            <h5 className=" text-3xl">Welcome, {user?.displayName}!</h5>
            <button
              className="float-right border border-zinc-900 p-2 hover:bg-red-400"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </button>
          </div>
          <div className="col-span-8 col-start-3 space-y-2 rounded-md border border-zinc-900 bg-teal-50 p-4">
            {showVacationForm ? (
              <div className="space-y-2">
                <VacationForm
                  toggleVacationForm={toggleVacationForm}
                  operationFlag="add"
                  initialValues={initialVacationValues!}
                />
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
              {showVacations ? (
                <div className="flow-root w-full space-y-2 border border-zinc-900 p-2">
                  {vacations.map((vacation: Vacation) => (
                    <VacationBox vacationInfo={vacation} key={vacation.id} />
                  ))}
                  <button
                    className="float-right border border-zinc-900 p-2 hover:bg-red-400"
                    onClick={toggleShowVacations}
                  >
                    Cancel view
                  </button>
                </div>
              ) : (
                <button
                  className="border border-zinc-900 p-2 text-base hover:bg-red-400"
                  onClick={handleGetVacations}
                >
                  Show my vacations
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
