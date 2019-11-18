const fs = require("fs");
const PromiseQueue = require("./promiseQueue");

const fsp = fs.promises;
const sread = src => JSON.parse(fs.readFileSync(`${src}.json`, "utf8"));
const read = src => async () => sread(src);
const write = (src, obj) => () => fsp.writeFile(`${src}.json`, JSON.stringify(obj));
const handles = {};
function handle(src, promiseReturningFn) {
   if (!handles[src]) handles[src] = new PromiseQueue();
   return handles[src].push(promiseReturningFn);
}
module.exports = {
   // all of the following functions return promises
   read(src) {
      return handle(src, read(src));
   },
   // read a file ending with .json
   write(src, obj) {
      return handle(src, write(src, obj));
   },
   // write to a file ending .json
   open(src) {
      let reso;
      const p = new Promise(r => reso = r);
      handle(src, () => {
         let resumeResolve,
            resumeReject;
         const hold = new Promise((res, rej) => {
            resumeResolve = res;
            resumeReject = rej;
         });
         setTimeout(() => resumeReject(new Error("The file has been open for too long!")), 0xFfFf);
         const o = sread(src);
         reso(new Proxy(() => 0, {
            get(t, k) {
               return o[k];
            },
            set(t, k, v) {
               return o[k] = v;
            },
            deleteProperty(t, k) {
               return delete o[k];
            },
            apply() {
               fs.writeFileSync(`${src}.json`, JSON.stringify(o));
               resumeResolve();
            },
         }));
         return hold;
      });
      return p;
   },
   /*
    * resolves to a proxy where getting, setting, or deleting keys will modify the JSON
    * the JSON will be written back to the file system when the return promise is called
    */
};
