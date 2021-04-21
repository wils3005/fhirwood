import * as Zod from "zod";

import { Entry } from "./entry";

type ResponseBody = Zod.infer<typeof ResponseBody>;
type ResponseBodyLink = Zod.infer<typeof ResponseBodyLink>;

const ResponseBodyLink = Zod.array(
  Zod.object({
    relation: Zod.enum(["next", "previous", "self"]),
    url: Zod.string(),
  })
);

const ResponseBody = Zod.object({
  entry: Zod.array(Entry),
  id: Zod.string(),
  link: ResponseBodyLink,
  meta: Zod.object({ lastUpdated: Zod.string() }),
  resourceType: Zod.enum(["Bundle"]),
  total: Zod.number(),
  type: Zod.enum(["searchset"]),
});

export { ResponseBody };
