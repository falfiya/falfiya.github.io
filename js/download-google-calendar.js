const querystring = require("querystring");
const request = require("sync-request");
const rl = require("readline-sync");
const fs = require("fs");

const API_KEY = "AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs";

function join_params(params) {
   return (
      Object.entries(params)
         .map(([key, value]) => `${key}=${value}`)
         .join("&"));
}

const list_events = (calendar, paramstring) => `https://clients6.google.com/calendar/v3/calendars/${calendar}/events?${paramstring}`;

function calendar_urls(calendar) {
   const params = {
      calendarId: calendar,
      showDeleted: true,
      showHiddenInvitations: true,
      timeZone: "America/Los_Angeles",
      key: API_KEY,
   };

   const singleParams = {
      singleEvents: true,
      ...params,
   };

   const combinedParams = {
      singleEvents: false,
      ...params,
   };

   const singleParamsStr = join_params(singleParams);
   const combinedParamsStr = join_params(combinedParams);

   return ({
      single: list_events(calendar, singleParamsStr),
      combined: list_events(calendar, combinedParamsStr),
   });
}

const col = process.stdout.columns;
console.log("#".repeat(col));

function w(s, indent = "        ") {
   let out = "";
   let p = 0;
   for (let i = 0; i < s.length; ++i) {
      out += s[i];
      if (++p === (col - 20)) {
         out += `\n${indent}`;
         p = 0;
      }
   }
   return out;
}

let isDir;
try {
   isDir = fs.statSync("gcalendar").isDirectory;
} catch (e) {
   fs.mkdirSync("gcalendar");
   isDir = true;
} ; {
   if (!isDir) {
      console.log(`you have a thing called ${fs.realpathSync("gcalendar")} in the way of this program`);
      process.exit(1);
   }
}

rl.promptLoop(url => {
   if (/^(?:q(?:uit)?|exit)?$/i.test(url)) {
      return true;
   }

   const qs = querystring.parse(url);
   for (const calendar of qs.src) {
      const { single, combined } = calendar_urls(calendar);
      console.log(`CAL: ${w(calendar, "")}`);
      try {
         console.log(`   GET: ${w(single)}`);
         const single_d = JSON.parse(request("GET", single).getBody("utf8"));
         console.log(`   GET: ${w(combined)}`);
         const combine_d = JSON.parse(request("GET", combined).getBody("utf8"));

         const filedata = JSON.stringify({
            single: single_d,
            combined: combine_d,
         }/*, null, 3*/);

         const filename = `./gcalendar/${calendar}.gcalendar.json`;
         fs.writeFileSync(filename, filedata);
      } catch (e) {
         console.log(`  ERR: ${w(e.toString())}`);
      }
   }
});
