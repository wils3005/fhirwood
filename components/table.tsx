import { FC } from "react";

import type { Patient } from "../schemas/patient";

const TableRow: FC<{ index: number; patient: Patient }> = (props) => {
  const { index, patient } = props;
  const { age, birthDate, id, name = [] } = patient;
  const { given = [], family = "" } = name[0] ?? {};

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="mx-2 my-1 px-2 py-1 text-right">{index + 1}</td>
      <td className="mx-2 my-1 px-2 py-1">{id}</td>
      <td className="mx-2 my-1 px-2 py-1">{`${given.join(" ")} ${family}`}</td>
      <td className="mx-2 my-1 px-2 py-1">{birthDate}</td>
      <td className="mx-2 my-1 px-2 py-1 text-right">{age}</td>
    </tr>
  );
};

const Table: FC<{ patients: Patient[] }> = (props) => {
  const { patients } = props;

  const tbody = patients.map((patient, index) => (
    <TableRow index={index} key={patient.id} patient={patient} />
  ));

  return (
    <table className="w-full mx-2 my-1 px-2 py-1">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase leading-normal">
          <th className="w-1/12 mx-2 my-1 px-2 py-1"></th>
          <th className="w-2/12 mx-2 my-1 px-2 py-1">id</th>
          <th className="w-6/12 mx-2 my-1 px-2 py-1">name</th>
          <th className="w-2/12 mx-2 my-1 px-2 py-1">date of birth</th>
          <th className="w-1/12 mx-2 my-1 px-2 py-1">age</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 font-light">{tbody}</tbody>
    </table>
  );
};

export { Table, TableRow };
