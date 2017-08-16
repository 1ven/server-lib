import withBody from "./withBody";
import { Response } from "./";

export default (data?: any): Response =>
  withBody(data)({
    status: 200
  });
