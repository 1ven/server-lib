import { Chunk, symbol } from "./";
import { Request } from "../request";
import { Response, simple, withStatus } from "../response";

const notFoundResponse = withStatus(404)(simple());

export const makeFork = (notFound: Response = notFoundResponse) => (
  ...chunks: Chunk[]
) => (req: Request) => {
  for (let chunk of chunks) {
    try {
      return chunk(req);
    } catch (err) {
      if (err !== symbol) {
        throw err;
      }
    }
  }

  return notFound;
};

export default makeFork();