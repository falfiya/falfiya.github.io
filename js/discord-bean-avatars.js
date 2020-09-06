void function patch(px) {
   const mainCSS = document.styleSheets[0];
   mainCSS.insertRule(/* css */ `
      div.avatar-3uk_u9,
      div.wrapper-3t9DeA,
      div.subText-1KtqkB
      {
         display: none !important;
      }
   `, 0);
   mainCSS.insertRule(`
      div.member-3-YXUe {
         overflow: hidden;
         height: ${px}px;
      }
   `, 0);
   mainCSS.insertRule(`
      div.layout-2DM8Md {
         height: inherit !important;
      }
   `, 0);
}(24);
