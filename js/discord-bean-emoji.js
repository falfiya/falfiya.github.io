void function bean(emoji) {
   const mainCSS = document.styleSheets[0];
   mainCSS.insertRule(/* css */ `
      img.emoji[aria-label*="${emoji}"] {
         display: none;
      }
   `, 0);
   return arguments.callee;
}("pleading");
