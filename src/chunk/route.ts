import * as UrlPattern from "url-pattern";
import { curry, compose, replace, omit, mergeDeepLeft } from "ramda";
import { symbol as forkSymbol } from "./";
import { Request } from "../request";
import { Response } from "../response";

export type Matched = {
  params?: Record<string, string>;
  rest: string;
};

export type RouteChunk = (req: Request & Matched) => Promise<Response>;
export type RouteRequest = Request & Matched;
export const isRouteRequest = (arg): arg is RouteRequest => Boolean(arg.rest);

export default curry(
  (template: string, chunk: RouteChunk) => (req: RouteRequest | Request) => {
    const matched = isRouteRequest(req)
      ? match(template, req.rest)
      : match(template, req.uri);

    if (matched) {
      return chunk(mergeDeepLeft(matched, req));
    }

    throw forkSymbol;
  }
);

// TODO: cut multiple leading slashes
const withOnlyLeadingSlash = (s: string) => s.replace(/^\/?(.*?)\/*?$/, "/$1");
const handleRest = (_?:string) => _ === "" ? "/" : typeof _ === "undefined" ? "" : _;

const match = (template: string, uri: string) => {
  if (uri === '') return null;

  const result = new UrlPattern(withOnlyLeadingSlash(template)).match(
    withOnlyLeadingSlash(uri)
  );

  return result && {
    rest: handleRest(result._),
    params: omit(["_"], result)
  }
};
