import * as Zod from "zod";

type Patient = Zod.infer<typeof Patient>;
type PatientAddress = Zod.infer<typeof PatientAddress>;
type PatientGender = Zod.infer<typeof PatientGender>;
type PatientIdentifier = Zod.infer<typeof PatientIdentifier>;
type PatientMeta = Zod.infer<typeof PatientMeta>;
type PatientName = Zod.infer<typeof PatientName>;
type PatientText = Zod.infer<typeof PatientText>;

const PatientAddress = Zod.array(
  Zod.object({ city: Zod.string().optional() })
).optional();

const PatientGender = Zod.enum([
  "female",
  "male",
  "other",
  "unknown",
]).optional();

const PatientIdentifier = Zod.array(
  Zod.object({ value: Zod.string().optional() })
).optional();

const PatientMeta = Zod.object({
  versionId: Zod.string(),
  lastUpdated: Zod.string(),
  source: Zod.string(),
});

const PatientName = Zod.array(
  Zod.object({
    family: Zod.string().optional(),
    given: Zod.array(Zod.string()).optional(),
  }).optional()
).optional();

const PatientText = Zod.object({
  div: Zod.string().optional(),
  status: Zod.string().optional(),
});

const Patient = Zod.object({
  address: PatientAddress,
  birthDate: Zod.string(),
  gender: PatientGender,
  id: Zod.string(),
  identifier: PatientIdentifier,
  meta: PatientMeta,
  name: PatientName,
  resourceType: Zod.enum(["Patient"]),
  text: PatientText,
  age: Zod.number().optional(),
  cohort: Zod.string().optional(),
});

export { Patient, PatientIdentifier, PatientMeta, PatientName, PatientText };
