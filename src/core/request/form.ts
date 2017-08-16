import { map, split, compose } from "ramda";

const tupleToObject = ([k, v]: [string, string]) => ({ [k]: v });

const pairToObject = compose(
  tupleToObject,
  map(decodeURIComponent),
  split("=")
);

export default (data: string) =>
  data.split("&").reduce(
    (acc, pair: string) => ({
      ...acc,
      ...pairToObject(pair)
    }),
    {}
  );
