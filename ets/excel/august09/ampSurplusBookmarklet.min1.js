// @filename ampSurplusBookmarklet.js
// @author Cole Gannon <chungannoncole@fhda.edu>
// @date 9 August 2023
// First minification with comments
void((
   A=alert,
   u="User Error: ",
   V=(x,n)=>A(u+`"${x}" is not a valid ${n}!`),
   d=1, // dummy variable
   e="FHDA_Asset_Number f03_0000 Description Serial_Num/VIN Make/Manufacturer Model Model_Year f03_0001 Condition Code_for_Screen_Size_and_Item".split` `.map((e,i)=>(d&=(e=document.getElementById(e))instanceof(i>7?HTMLSelectElement:HTMLInputElement),e)),
   // first param is element idx, second param is cell number
   s=(i,v)=>(e[i].value=v,e[i].dispatchEvent(new FocusEvent("blur")),setTimeout(_=>e[i].value==v||(e[i].style.backgroundColor="#f35"),777),e[i].style.backgroundColor="#9da"), // [s]et value
   // first param is element idx, second param is text
   o=(i,t,o=[...e[i].children].find(o=>o instanceof HTMLOptionElement&&o.innerText==t))=>o&&s(i,o.value),
   r,l
)=>
   d // if all html elements check out
      ?(r=prompt`Paste the entire Excel row here starting with 1 ...`?.split("\t"))
         // 2=fhdaAsset 3=clazz, 5=description, 7=condition, 8=serial, 9=brand
         // 10=model 11=modelYear 13=univWasteClass 14=screenSize
         ?(d=r.length)>14
            ?/\d+/.test(d=r[2]) // fhdaAsset
               ?/\d{4}/.test(d=r[11]) // modelYear
                  ?(
                     s(0,r[2]),  // fhdaAssetInputMaybe.value = fhdaAsset;
                     s(1,r[3]),  // ampClassInputMaybe.value = clazz;
                     s(2,r[5]),  // descriptionInputMaybe.value = description;
                     s(3,r[8]),  // serialInputMaybe.value = serial;
                     s(4,r[9]),  // brandInputMaybe.value = brand;
                     s(5,r[10]), // modelInputMaybe.value = model;
                     s(6,r[11]), // modelYearInputMaybe.value = modelYear;
                     s(7,r[13]), // univWasteClassInputMaybe.value = univWasteClass;
                     o(8,l=r[7])
                  )
                     ?o(9,d=r[14])
                        ||V(d,"screen size")
                     :V(d,"condition")
                  :V(d,"Model Year")
               :V(d,"FHDA Asset Number")
            :A(u+"Missing Cells! Wanted 15, got "+d)
         :A(u+"Blank Entry!")
      :A`Bookmarklet Failure! Are you on the right page?`
)()
