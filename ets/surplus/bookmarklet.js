// @filename ampSurplusBookmarklet.js
// @author Cole Gannon <chungannoncole@fhda.edu>
// @date 14 August 2023

void (() => {
   const row = prompt("Paste the entire Excel row");
   if (row == null) {
      return alert(`User Error: User clicked cancel!`);
   }

   const [
      num,            //  0
      rdyOrNot,       //  1
      fhdaAsset,      //  2
      clazz,          //  3
      friendlyName,   //  4
      description,    //  5
      spacer0,        //  6
      condition,      //  7
      serial,         //  8
      brand,          //  9
      model,          // 10
      modelYear,      // 11
      spacer1,        // 12
      univWasteClass, // 13
      screenSize      // 14
   ] = row.split("\t");

   let fhdaAssetGood = /\d+/.test(fhdaAsset);

   let modelYearGood = /\d{4}/.test(modelYear);

   const getElement = document.getElementById.bind(document);

   const fhdaAssetInputMaybe      = getElement("FHDA_Asset_Number");
   const ampClassInputMaybe       = getElement("f03_0000");
   const descriptionInputMaybe    = getElement("Description");
   const conditionSelectMaybe     = getElement("Condition");
   const serialInputMaybe         = getElement("Serial_Num/VIN");
   const brandInputMaybe          = getElement("Make/Manufacturer");
   const modelInputMaybe          = getElement("Model");
   const modelYearInputMaybe      = getElement("Model_Year");
   const univWasteClassInputMaybe = getElement("f03_0001");
   const screenSizeSelectMaybe    = getElement("Code_for_Screen_Size_and_Item");

   if (true
      && fhdaAssetInputMaybe      instanceof HTMLInputElement
      && ampClassInputMaybe       instanceof HTMLInputElement
      && descriptionInputMaybe    instanceof HTMLInputElement
      && conditionSelectMaybe     instanceof HTMLSelectElement
      && serialInputMaybe         instanceof HTMLInputElement
      && brandInputMaybe          instanceof HTMLInputElement
      && modelInputMaybe          instanceof HTMLInputElement
      && modelYearInputMaybe      instanceof HTMLInputElement
      && univWasteClassInputMaybe instanceof HTMLInputElement
      && screenSizeSelectMaybe    instanceof HTMLSelectElement)
   {
      function setValue(element, value) {
         const COLOR_GOOD = "#9da";
         const COLOR_BAD  = "#f35";
         element.value = value;
         element.style.backgroundColor = COLOR_GOOD;
         element.dispatchEvent(new FocusEvent("blur"));
         const TIME_TO_WAIT = 777;
         setTimeout(() => {
            // check if the form rejected it
            if (element.value != value) {
               element.style.backgroundColor = COLOR_BAD;
            }
         }, TIME_TO_WAIT);
      }
      function selectOption(selectElement, optionText, noun) {
         const option = [...selectElement.children].find(
            optionMaybe => true
               && optionMaybe instanceof HTMLOptionElement
               && optionMaybe.innerText === condition
         );
         if (option === undefined) {
            return alert(`User Error: "${condition}" is not a valid ${noun}!`);
         } else {
            setValue(selectElement, option.value);
         }
      }
      setValue(fhdaAssetInputMaybe, fhdaAsset);
      setValue(ampClassInputMaybe, clazz);
      setValue(descriptionInputMaybe, description);
      selectOption(conditionSelectMaybe, condition, "condition");
      setValue(serialInputMaybe, serial);
      setValue(brandInputMaybe, brand);
      setValue(modelInputMaybe, model);
      setValue(modelYearInputMaybe, modelYear);
      setValue(univWasteClassInputMaybe, univWasteClass);
      selectOption(screenSizeSelectMaybe, screenSize, "screen size");
   } else {
      return alert("Bookmarklet Failure! Are you on the right page?");
   }
})();
