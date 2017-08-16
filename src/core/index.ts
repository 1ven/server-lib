import * as net from "net";
import { toResponseString } from "./response";
import { fromRequestString } from "./request";

export function start(chunk, port: number, onStart?: Function) {
  const server = net.createServer();

  server.on(
    "connection",
    (socket: net.Socket) =>
      new Promise((resolve, reject) => {
        socket.setEncoding("utf8");
        socket.on("data", async (rq: string) => {
          try {
            const res = await chunk(fromRequestString(rq));
            socket.end(toResponseString(res), "utf8");
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      })
  );

  server.listen(port, onStart);
}
