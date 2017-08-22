import { curry } from "ramda";
import { Chunk, symbol } from "./";
import { Request } from "../request";
import { Response } from "../response";

export default curry((predicate: boolean, chunk: Chunk) => (req: Request) => {
  if (predicate) {
    return chunk(req);
  }
  throw symbol;
});
