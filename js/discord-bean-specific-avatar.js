void function bean(user) {
   const mainCSS = document.styleSheets[0];
   mainCSS.insertRule(/* css */ `
      div.wrapper-3t9DeA[aria-label^="${user}"] {
         display: none;
      }
   `, 0);
   return arguments.callee;
}("coalpha");
