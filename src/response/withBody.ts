import { merge } from "ramda";
import { Response } from "./";

export default (body: any) => (res): Response => ({
  ...res,
  body
});
