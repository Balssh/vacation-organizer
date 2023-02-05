import { FC, useState } from "react";
import { Vacation } from "../interfaces/interfaces";
import VacationForm from "./vacationForm";
import { User } from "firebase/auth";

const VacationBox: FC<{ vacationInfo: Vacation }> = ({ vacationInfo }) => {
  const [editVacation, setEditVacation] = useState(false);
  const deleteVacation = () => {
    console.log("delete");
  };
  const toggleEditVacation = () => {
    setEditVacation(!editVacation);
  };
  // console.log(vacationInfo.);
  return (
    <div className="flex flex-col space-y-2 border border-zinc-900 p-2">
      {editVacation ? (
        <VacationForm
          // currentUser={currentUser}
          toggleVacationForm={toggleEditVacation}
          operationFlag="edit"
          docID={vacationInfo.id}
          initialValues={vacationInfo!}
        />
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{vacationInfo.name}</h1>
          <p className="ml-2">Cost: {vacationInfo.cost}</p>
          <p className="ml-2">Location: {vacationInfo.location}</p>
          <p className="ml-2">Participants:</p>
          <ul className="ml-4">
            {vacationInfo.participants.map((participant) => (
              <li key={participant.name}>
                {participant.name} - {participant.paid ? "Paid" : "Not paid"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center space-x-2">
        <button className="border border-zinc-900 p-2 hover:bg-red-400">
          Delete
        </button>
        <button
          className="border border-zinc-900 p-2 hover:bg-red-400"
          onClick={toggleEditVacation}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default VacationBox;
