declare const appliance_symbol: unique symbol;

type fridge_t = {readonly [appliance_symbol]: fridge_t};
type fridge = string & fridge_t;
const make_fridge = <val extends string>(val: val) => val as val & fridge;

const frigidaire = make_fridge("Frigidaire");
const kitchenaid = make_fridge("KitchenAid");

type washer_t = {readonly [appliance_symbol]: washer_t};
type washer = string & washer_t;
const make_washer = <val extends string>(val: val) => val as val & washer;

const ge = make_washer("GE");
const samsung = make_washer("Samsung");

const unwrap_appliance = <T extends {readonly [appliance_symbol]: unknown}>(T: T) =>
   T as T extends infer val & typeof T[typeof appliance_symbol] ? val : never;

const f = unwrap_appliance(frigidaire);
