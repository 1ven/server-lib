import { Request } from "../request";
import { Response } from "../response";

export { default as fork, makeFork } from "./fork";
export { default as methods } from "./methods";
export { default as safe } from "./safe";
export { default as tap } from "./tap";
export { default as when } from "./when";
export { default as route, Matched } from "./route";
export { default as queryString, Query } from "./queryString";

export type Chunk = (req: Request) => Promise<Response>;

export const symbol = Symbol();
