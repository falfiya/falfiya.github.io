import {$extends} from "./type_traits";

type struct = {
   field?: number;
};

// :scrunge:
type wrong0 = $extends<struct, {}>; //:: true

type mutual_extends<a, b> = a extends b ? b extends a ? true : false : false;

// :scronge:
type wrong1 = mutual_extends<struct, {}> //:: true
type wrong2 = $extends<struct["field"], undefined>; //:: true
type correct = mutual_extends<struct["field"], undefined> //:: boolean

// so looks like we have to compare every damn field

type equals<a, b> =
   
