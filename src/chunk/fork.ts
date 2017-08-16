import { Chunk, symbol } from "./";
import { Request } from "../request";
import { Response } from "../response";

export default (...chunks: Chunk[]) => (req: Request) => {
  for (let chunk of chunks) {
    try {
      return chunk(req);
    } catch (err) {
      if (err !== symbol) {
        throw err;
      }
    }
  }

  throw symbol;
};
