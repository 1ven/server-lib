import { Chunk, symbol } from "./";
import { Request } from "../request";
import { Response, withStatus, simple, plain } from "../response";

export default (chunk: Chunk) => async (req: Request) => {
  try {
    return await chunk(req);
  } catch (err) {
    const withErrorStatus = withStatus(500);
    return process.env.NODE_ENV === "production"
      ? withErrorStatus(simple())
      : withErrorStatus(plain(getMessage(err)));
  }
};

const getMessage = err =>
  !err ? "Empty error" : err.stack || err.message || JSON.stringify(err);
