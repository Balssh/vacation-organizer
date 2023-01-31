import { FC } from "react";
import { Vacation } from "../interfaces/interfaces";

const vacationBox: FC<{ vacationInfo: Vacation }> = ({ vacationInfo }) => {
  return <div>{vacationInfo.name}</div>;
};

export default vacationBox;
