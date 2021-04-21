import * as Zod from "zod";

import { Patient } from "./patient";

type Entry = Zod.infer<typeof Entry>;

const Entry = Zod.object({
  fullUrl: Zod.string(),
  resource: Patient,
  search: Zod.object({ mode: Zod.enum(["match"]) }),
});

export { Entry };
