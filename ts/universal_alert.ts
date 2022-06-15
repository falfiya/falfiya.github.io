void async function main() {
   let ponyfill;
   if (typeof window === "undefined") {
      ponyfill = (await import("./node_alert")).alert;
   } else {
      ponyfill = window.alert;
   }
   ponyfill("hello");
}();
