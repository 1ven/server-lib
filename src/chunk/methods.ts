import { curry, contains, toUpper, trim, split, compose } from "ramda";
import { Chunk, symbol } from "./";
import { Request } from "../request";
import { Response } from "../response";

export default curry((methods: string, chunk: Chunk) => (req: Request) => {
  if (contains(req.method, toList(methods))) {
    return chunk(req);
  } else {
    throw symbol;
  }
});

const toList = compose(split(","), trim, toUpper);
