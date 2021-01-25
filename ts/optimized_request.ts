import {connect} from "http2";
import {gunzipSync} from "zlib";

type callback = (response: object) => void;

export function request_json(domain: string, path: string, exit: callback) {
   const conn = connect(domain);

   const req = conn.request({
      "user-agent": "@coalpha/optimized_request.ts",
      "accept-encoding": "gzip",
      ":path": path,
   });

   req.once("response", headers => copy_chunks(
      Number(headers["content-length"]),
      headers["content-encoding"],
   ));

   req.end();

   type content_encoding = string | undefined;
   function copy_chunks(len: number, fmt: content_encoding) {
      if (len) {
         copy_chunks_len(len, fmt);
      } else {
         // it's NaN
         copy_chunks_nolen(fmt);
      }
   }

   function copy_chunks_len(len: number, fmt: content_encoding) {
      const buffer = Buffer.allocUnsafe(len);
      var pos = 0;
      req.on("data", (chunk: Buffer) => {
         chunk.copy(buffer, pos);
         pos += chunk.byteLength;
      });
      req.once("end", () => parse_fmt_maybe(fmt, buffer));
   }

   function copy_chunks_nolen(fmt: content_encoding) {
      const buffers: Buffer[] = [];
      req.on("data", (chunk: Buffer) => buffers.push(chunk));
      req.once("end", () => parse_fmt_maybe(fmt, Buffer.concat(buffers)));
   }

   function parse_fmt_maybe(fmt: content_encoding, buffer: Buffer) {
      if (fmt == null) {
         all_good(buffer);
      } else if (fmt === "gzip") {
         gunzip(buffer);
      } else {
         throw new Error(`What the fsck, server, I didn't ask for ${fmt}!`);
      }
   }

   function gunzip(buffer: Buffer) {
      // const isize = ibuf.readInt32LE(ibuf.byteLength - 4);
      // const obuf = Buffer.allocUnsafe(isize);
      all_good(gunzipSync(buffer));
   }

   function all_good(buffer: Buffer) {
      conn.close();
      exit(JSON.parse(buffer.toString()));
   }
}
