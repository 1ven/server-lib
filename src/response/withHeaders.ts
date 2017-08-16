import { Response } from "./";

export default headers => (res: Response): Response => ({
  ...res,
  headers: {
    ...res.headers,
    ...headers
  }
});
