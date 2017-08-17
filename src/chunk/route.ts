import * as UrlPattern from "url-pattern";
import { curry, compose, replace, omit } from "ramda";
import { symbol } from "./";
import { Request } from "../request";
import { Response } from "../response";

export type RouteRequest = Request & Matched;

export type Matched = {
  params?: Record<string, string>;
  rest?: string;
};

export type RouteChunk = (req: RouteRequest) => Promise<Response>;

export default curry(
  (template: string, chunk: RouteChunk) => (req: RouteRequest) => {
    const matched = match(template, req);

    if (matched) {
      return chunk({ ...req, ...matched });
    }

    throw symbol;
  }
);

const withOnlyLeadingSlash = (s: string) => s.replace(/^\/?(.*?)\/*?$/, "/$1");
const withoutTrailingSlash = (s: string) => s.replace(/^(.+?)\/*?$/, "$1")

const match = (template: string, req: RouteRequest) => {
  const result = new UrlPattern(withOnlyLeadingSlash(template)).match(
    withoutTrailingSlash(req.rest || req.uri)
  );

  return result
    ? {
        rest: result._ || '/',
        params: { ...omit(["_"], result), ...req.params }
      }
    : void 0;
};
