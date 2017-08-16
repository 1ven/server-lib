import { compose } from "ramda";
import withHeaders from "./withHeaders";
import simple from "./simple";
import { Response } from "./";

export default compose(
  withHeaders({
    "Content-Type": "application/json"
  }),
  simple
);
