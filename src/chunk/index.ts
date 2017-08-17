import { Request } from "../request";
import { Response } from "../response";

export { default as fork } from "./fork";
export { default as methods } from "./methods";
export { default as safe } from "./safe";
export { default as route } from "./route";
export { default as tap } from "./tap";

export type Chunk = (req: Request) => Promise<Response>;

export const symbol = Symbol();
