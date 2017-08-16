import { path, identity } from "ramda";
import parser = require("http-string-parser");
import { Request } from "../../request";
import form from "./form";
import json from "./json";

const map = {
  "application/x-www-form-urlencoded": form,
  "application/json": json
};

export const fromRequestString = (raw: string): Request => {
  const req = parser.parseRequest(raw) as Request;
  const contentType = path(["headers", "Content-Type"], req) as string;
  const parse = map[contentType] || identity;

  return req.body
    ? {
        ...req,
        body: parse(req.body)
      }
    : req;
};
