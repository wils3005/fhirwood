import { FC } from "react";
import { Bar } from "react-chartjs-2";

import type { Patient } from "../schemas/patient";

const cohorts = () => ({
  "0-4": 0,
  "5-9": 0,
  "10-14": 0,
  "15-19": 0,
  "20-24": 0,
  "25-29": 0,
  "30-34": 0,
  "35-39": 0,
  "40-44": 0,
  "45-49": 0,
  "50-54": 0,
  "55-59": 0,
  "60-64": 0,
  "65-69": 0,
  "70-74": 0,
  "75-79": 0,
  "80-84": 0,
  "85-89": 0,
  "90-94": 0,
  "95-99": 0,
  "100+": 0,
  unknown: 0,
});

const Chart: FC<{ patients: Patient[] }> = (props) => {
  const { patients } = props;

  const patientCohorts = patients.reduce(
    (patientCohorts: Record<string, number>, patient: Patient) => {
      const { cohort = "unknown" } = patient;

      if (patientCohorts[cohort]) {
        patientCohorts[cohort] += 1;
      } else {
        patientCohorts[cohort] = 1;
      }

      return patientCohorts;
    },
    cohorts()
  );

  const data = {
    labels: Object.keys(patientCohorts),
    datasets: [{ data: Object.values(patientCohorts) }],
  };

  const options = {
    legend: { display: false },
    title: {
      display: true,
      text: "Number of Patients by Age Cohort",
    },
  };

  return <Bar {...{ data, options }} />;
};

export { Chart };
