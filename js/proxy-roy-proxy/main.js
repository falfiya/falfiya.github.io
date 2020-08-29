const fetch = require("node-fetch");
const btoa = require("btoa");
const fs = require("fs");
const Koa = require("koa");
const app = new Koa();

process.chdir(__dirname);

const cacheEntries = Object.create(null);

fs.readdirSync("cache").forEach(dirent => {
   cacheEntries[dirent] = true;
});

async function getSite(page) {
   const btoapage = btoa(page);
   const file = `cache/${btoapage}`;
   if (cacheEntries[btoapage]) {
      console.log("read from cache");
      return fs.readFileSync(file, "utf8");
   }

   cacheEntries[btoapage] = true;
   const res = await fetch(page).then(r => r.text());
   fs.writeFileSync(file, res);
   return res;
}

app.use(async ctx => {
   const { site } = ctx.request.query;
   if (site === undefined) {
      ctx.body = "site was undefined.";
      return;
   }

   const out = await getSite(site);
   ctx.body = out;
});

app.listen(8080);
