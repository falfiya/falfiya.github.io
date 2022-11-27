declare const some_object: {[k in string]: unknown};

declare function kt_predicate
   <o extends {}, k extends string, v>
      (o: o, k: k, v: v):
         o is o & {[_ in k]: v};

if (kt_predicate(some_object, "tag", "square")) {
   if (kt_predicate(some_object, "side_length", 0)) {}
   else {
      throw void 0;
   }
} else
if (kt_predicate(some_object, "tag", "circle")) {
   if (kt_predicate(some_object, "radius", 0)) {}
   else {
      throw void 0;
   }
}
else {
   throw void 0;
}

some_object
