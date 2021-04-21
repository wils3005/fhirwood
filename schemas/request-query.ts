import * as Zod from "zod";

type RequestQuery = Zod.infer<typeof RequestQuery>;

const RequestQuery = Zod.object({ count: Zod.string(), offset: Zod.string() });

export { RequestQuery };
