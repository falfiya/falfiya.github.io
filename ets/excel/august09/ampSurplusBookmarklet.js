// @filename ampSurplusBookmarklet.js
// @author Cole Gannon <chungannoncole@fhda.edu>
// @date 9 August 2023
// Tailor ampSurplus.js for bookmarklet usage & cleanup
// Childproofing using the blur event

void (() => {
   const row = prompt("Paste the entire Excel row here starting with 1 ...");
   if (row == null) {
      return alert(`User Error: User clicked cancel!`);
   }

   const [
      num, // 0
      rdyOrNot, // 1
      fhdaAsset, // 2
      clazz, // 3
      friendlyName, // 4
      description, // 5
      spacer0, // 6
      condition, // 7
      serial, // 8
      brand, // 9
      model, // 10
      modelYear, // 11
      spacer1, // 12
      univWasteClass, // 13
      screenSize // 14
   ] = row.split("\t");

   if (Number.isNaN(parseInt(fhdaAsset, 10))) {
      return alert(`User Error: "${fhdaAsset}" is not a valid FHDA Asset Number!`);
   }

   if (Number.isNaN(parseInt(modelYear, 10))) {
      return alert(`User Error: "${modelYear}" is not a valid year!`);
   }

   const getId = document.getElementById.bind(document);

   const fhdaAssetInputMaybe = getId("FHDA_Asset_Number");
   const ampClassInputMaybe = getId("f03_0000");
   const descriptionInputMaybe = getId("Description");
   const conditionSelectMaybe = getId("Condition");
   const serialInputMaybe = getId("Serial_Num/VIN");
   const brandInputMaybe = getId("Make/Manufacturer");
   const modelInputMaybe = getId("Model");
   const modelYearInputMaybe = getId("Model_Year");
   const univWasteClassInputMaybe = getId("f03_0001");
   const screenSizeSelectMaybe = getId("Code_for_Screen_Size_and_Item");

   if (true
      && fhdaAssetInputMaybe instanceof HTMLInputElement
      && ampClassInputMaybe instanceof HTMLInputElement
      && descriptionInputMaybe instanceof HTMLInputElement
      && conditionSelectMaybe instanceof HTMLSelectElement
      && serialInputMaybe instanceof HTMLInputElement
      && brandInputMaybe instanceof HTMLInputElement
      && modelInputMaybe instanceof HTMLInputElement
      && modelYearInputMaybe instanceof HTMLInputElement
      && univWasteClassInputMaybe instanceof HTMLInputElement
      && screenSizeSelectMaybe instanceof HTMLSelectElement)
   {
      function markDone(element) {
         element.style.backgroundColor = "orange";
         element.dispatchEvent(new FocusEvent("blur"));
      }
      fhdaAssetInputMaybe.value = fhdaAsset;
      markDone(fhdaAssetInputMaybe);
      ampClassInputMaybe.value = clazz;
      markDone(ampClassInputMaybe);
      descriptionInputMaybe.value = description;
      markDone(descriptionInputMaybe);
      const conditionOptionMaybe = [...conditionSelectMaybe.children].find(
         optionMaybe => true
            && optionMaybe instanceof HTMLOptionElement
            && optionMaybe.innerText === condition
      );
      if (conditionOptionMaybe instanceof HTMLOptionElement) {
         conditionSelectMaybe.value = conditionOptionMaybe.value;
         markDone(conditionSelectMaybe);
      } else {
         return alert(`User Error: "${condition}" is not a valid condition!`);
      }
      serialInputMaybe.value = serial;
      markDone(serialInputMaybe);
      brandInputMaybe.value = brand;
      markDone(brandInputMaybe);
      modelInputMaybe.value = model;
      markDone(modelInputMaybe);
      modelYearInputMaybe.value = modelYear;
      markDone(modelYearInputMaybe);
      univWasteClassInputMaybe.value = univWasteClass;
      markDone(univWasteClassInputMaybe);
      const screenSizeOptionMaybe = [...screenSizeSelectMaybe.children].find(
         optionMaybe => true
            && optionMaybe instanceof HTMLOptionElement
            && optionMaybe.innerText === screenSize
      );
      if (screenSizeOptionMaybe instanceof HTMLOptionElement) {
         screenSizeSelectMaybe.value = screenSizeOptionMaybe.value;
         markDone(screenSizeSelectMaybe);
      } else {
         return alert(`User Error: "${screenSize}" is not a valid screen size!`);
      }
   } else {
      // ideally we'd have an error for each of the incorrect HTML elements but
      // I think most people in ETS aren't programmers so there isn't a way for
      // them to fix it.
      return alert("Bookmarklet Failure! Are you on the right page?");
   }
})();
