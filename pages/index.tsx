import { FC, FormEventHandler, ReactEventHandler, useState } from "react";
import Head from "next/head";

import { Chart } from "../components/chart";
import { Form } from "../components/form";
import { Patient } from "../schemas/patient";
import { ResponseBody } from "../schemas/response-body";
import { Table } from "../components/table";
import { calcAge } from "../utils/calc-age";

const Main: FC = () => {
  const [loadedPatients, setLoadedPatients] = useState<Map<string, Patient>>(
    new Map()
  );

  const [avgAge, setAvgAge] = useState(0);
  const [count, setCount] = useState(10);
  const [displayedPatients, setDisplayedPatients] = useState<Patient[]>([]);
  const [numPediatrics, setNumPediatrics] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pediatricFilter, setPediatricFilter] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const res = await fetch(`/api/patients?count=${count}&offset=${offset}`, {
      headers: { "Content-Type": "application/json" },
    });

    const responseBody = ResponseBody.parse(await res.json());

    const newPatients = new Map(
      responseBody.entry.map((entry) => {
        const { resource: patient } = entry;
        patient.age = calcAge(patient.birthDate);

        if (patient.age < 0) {
          patient.cohort = "unknown";
        } else if (patient.age >= 100) {
          patient.cohort = "100+";
        } else {
          const min = patient.age - (patient.age % 5);
          const max = min + 4;
          patient.cohort = `${min}-${max}`;
        }

        return [patient.id, patient];
      })
    );

    const updatedPatients = new Map([...loadedPatients, ...newPatients]);

    setLoadedPatients(updatedPatients);

    setDisplayedPatients(
      pediatricFilter
        ? Array.from(updatedPatients.values()).filter((patient) => {
            const { age = 0 } = patient;
            return age >= 0 && age < 18;
          })
        : Array.from(updatedPatients.values())
    );

    setTotalPatients(responseBody.total);

    setAvgAge(
      Math.round(
        Array.from(updatedPatients.values())
          .map((patient) => calcAge(patient.birthDate))
          .reduce((acc, elem) => (acc += elem)) / updatedPatients.size
      )
    );

    setNumPediatrics(
      Array.from(updatedPatients.values()).filter((patient) => {
        const { age = 0 } = patient;
        return age >= 0 && age < 18;
      }).length
    );

    setOffset(offset + count);
  };

  const selectOnChange: ReactEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault();
    setCount(Number(event.currentTarget.value));
  };

  const checkboxOnChange: ReactEventHandler<HTMLInputElement> = (event) => {
    const checked = (event.target as HTMLInputElement).checked;
    setPediatricFilter(checked);

    setDisplayedPatients(
      checked
        ? Array.from(loadedPatients.values()).filter((patient) => {
            const { age = 0 } = patient;
            return age >= 0 && age < 18;
          })
        : Array.from(loadedPatients.values())
    );
  };

  return (
    <main className="flex flex-col max-w-screen-lg mx-auto my-1 px-2 py-1">
      <Head>
        <title>{"fhirwood"}</title>
        <link href="favicon.png" rel="icon" />

        <link
          href="//fonts.googleapis.com/css?family=Source+Serif+Pro:400,600,700|Roboto:300,400,400i,500,700"
          rel="stylesheet"
        />
      </Head>

      <section className="flex flex-col mx-2 my-1 px-2 py-1">
        <ul className="mx-2 my-1 px-2 py-1">
          <li>{`Total patients: ${totalPatients}`}</li>
          <li>{`Loaded patients: ${loadedPatients.size}`}</li>
          <li>{`Pediatric patients: ${numPediatrics}`}</li>
          <li>{`Average age: ${avgAge}`}</li>
        </ul>

        <hr />

        <Form
          checkboxChecked={pediatricFilter}
          checkboxOnChange={checkboxOnChange}
          selectOnChange={selectOnChange}
          onSubmit={onSubmit}
          count={count}
        />

        <hr />
        <Chart patients={displayedPatients} />
        <hr />
        <Table patients={displayedPatients} />
      </section>
    </main>
  );
};

export default Main;
