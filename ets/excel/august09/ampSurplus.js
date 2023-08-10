// @filename ampSurplusAsset.js
// @author Cole Gannon <chungannoncole@fhda.edu>
// @date 9 August 2023
// Trying to automate excel entry into AMP. This is the basic functionality.
// Error handling is done using built in EH, which isn't great for an actual
// bookmarklet but it gets the point across

function parseExcelRow(s) {
   // excel rows come in as a tab separated list of cells
   // like so:
   // 1		192065	COMPUTERS	Dell Optiplex	Dell Optiplex - 192065		Used - Fair	6Q7HJN1	Dell	Optiplex 780	2010		I - CPUs - Computers	1 - 4 inches - 15 inches
   // obviously this is dependant on the excel sheet itself, which I recently
   // re-made. it's not gonna work if you have rows out of order.
   const [
      num,
      rdyOrNot,
      fhdaAsset,
      clazz,
      friendlyName,
      description,
      spacer0,
      condition,
      serial,
      brand,
      model,
      modelYear,
      spacer1,
      univWasteClass,
      screenSize
   ] = s.split("\t");

   // basic validation
   if (Number.isNaN(parseInt(fhdaAsset, 10))) {
      throw new Error(`User Error: ${fhdaAsset} is not a valid FHDA Asset Number!`);
   }

   // could check for four digit number but I don't really care
   if (Number.isNaN(parseInt(modelYear, 10))) {
      throw new Error(`User Error: ${modelYear} is not a valid year!`);
   }

   return {fhdaAsset, clazz, description, condition, serial, brand, model, modelYear, univWasteClass, screenSize};
}

function putData(assetObject) {
   // we don't know if the form's changed--maybe it has so let's validate all of
   // our HTML elements
   const fhdaAssetInputMaybe = document.getElementById("FHDA_Asset_Number");
   const ampClassInputMaybe = document.getElementById("f03_0000");
   const descriptionInputMaybe = document.getElementById("Description");
   const conditionSelectMaybe = document.getElementById("Condition");
   const serialInputMaybe = document.getElementById("Serial_Num/VIN");
   const brandInputMaybe = document.getElementById("Make/Manufacturer");
   const modelInputMaybe = document.getElementById("Model");
   const modelYearInputMaybe = document.getElementById("Model_Year");
   const univWasteClassInputMaybe = document.getElementById("f03_0001");
   const screenSizeSelectMaybe = document.getElementById("Code_for_Screen_Size_and_Item");
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
      fhdaAssetInputMaybe.value = assetObject.fhdaAsset;
      fhdaAssetInputMaybe.style.backgroundColor = "orange";
      ampClassInputMaybe.value = assetObject.clazz;
      ampClassInputMaybe.style.backgroundColor = "orange";
      descriptionInputMaybe.value = assetObject.description;
      descriptionInputMaybe.style.backgroundColor = "orange";
      const conditionOptionMaybe = [...conditionSelectMaybe.children].find(
         optionMaybe => true
            && optionMaybe instanceof HTMLOptionElement
            && optionMaybe.innerText === assetObject.condition
      );
      if (conditionOptionMaybe instanceof HTMLOptionElement) {
         conditionSelectMaybe.value = conditionOptionMaybe.value;
         conditionSelectMaybe.style.backgroundColor = "orange";
      } else {
         throw new Error(`User Error: Could not find matching Condition for "${assetObject.condition}"!`);
      }
      serialInputMaybe.value = assetObject.serial;
      serialInputMaybe.style.backgroundColor = "orange";
      brandInputMaybe.value = assetObject.brand;
      brandInputMaybe.style.backgroundColor = "orange";
      modelInputMaybe.value = assetObject.model;
      modelInputMaybe.style.backgroundColor = "orange";
      modelYearInputMaybe.value = assetObject.modelYear;
      modelYearInputMaybe.style.backgroundColor = "orange";
      univWasteClassInputMaybe.value = assetObject.univWasteClass;
      univWasteClassInputMaybe.style.backgroundColor = "orange";
      const screenSizeOptionMaybe = [...screenSizeSelectMaybe.children].find(
         optionMaybe => true
            && optionMaybe instanceof HTMLOptionElement
            && optionMaybe.innerText === assetObject.screenSize
      );
      if (screenSizeOptionMaybe instanceof HTMLOptionElement) {
         screenSizeSelectMaybe.value = screenSizeOptionMaybe.value;
         screenSizeSelectMaybe.style.backgroundColor = "orange";
      } else {
         throw new Error(`User Error: Could not find matching Screen Size for "${assetObject.screenSize}"!`);
      }
   } else {
      // ideally we'd have an error for each of the incorrect HTML elements but
      // I think most people in ETS aren't programmers so there isn't a way for
      // them to fix it.
      throw new Error("Bookmarklet Failure! Are you on the right page?");
   }
}

putData(parseExcelRow(prompt("Paste the entire Excel row here, starting with 1 ...")));
