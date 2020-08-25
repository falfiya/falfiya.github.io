function p() {
   const props = Object.create(null);
   const propertyDivs = document.querySelectorAll("div.grid-5 > div._2SYphfY1DF71e5bReqgDyP");

   for (const propertyDiv of propertyDivs) {
      const key = propertyDiv.children[0].children[0].innerText;
      const val = propertyDiv.children[2].innerText;
      const valNum = +val;
      if (Number.isNaN(valNum)) {
         props[key] = val;
      } else {
         props[key] = valNum;
      }
   }
   console.log(JSON.stringify(props, null, 3));
}

function d(long, short) {
   const greeks = ["Delta", "Gamma", "Theta", "Vega", "Rho"];
   return Object.fromEntries(
      Object.entries(long).map(([k, v]) => {
         if (greeks.includes(k)) {
            return [k, (v * 10000 - short[k] * 10000 | 0) / 10000];
         }
         return null;
      }).filter(i => i),
   );
}
