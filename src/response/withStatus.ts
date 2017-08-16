import { Response } from "./";

export default (status: number) => (res: Response): Response => ({
  ...res,
  status
});
