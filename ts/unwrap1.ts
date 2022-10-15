declare const appliance_symbol: unique symbol;

type fridge_t = {readonly [appliance_symbol]: fridge_t};
type fridge = string & fridge_t;
const make_fridge = <val extends string>(val: val) => val as val & fridge;

const frigidaire = make_fridge("Frigidaire");
const kitchenaid = make_fridge("KitchenAid");
declare const unknown_fridge: fridge;

type washer_t = {readonly [appliance_symbol]: washer_t};
type washer = string & washer_t;
const make_washer = <val extends string>(val: val) => val as val & washer;

const ge = make_washer("GE");
const samsung = make_washer("Samsung");
declare const unknown_washer: washer;

const unwrap_appliance = <T extends {readonly [appliance_symbol]: unknown}>(T: T) =>
   T as T extends infer val & typeof T[typeof appliance_symbol] ? val : never;

const frigidaire_name     = unwrap_appliance(frigidaire);
const ge_name             = unwrap_appliance(ge);
const unknown_fridge_name = unwrap_appliance(unknown_fridge);

type unwrap_appliance<T extends {readonly [appliance_symbol]: unknown}> =
   T extends infer val & T[typeof appliance_symbol] ? val : never;

type kitchenaid_name     = unwrap_appliance<typeof kitchenaid>;
type samsung_name        = unwrap_appliance<typeof samsung>;
type unknown_washer_name = unwrap_appliance<typeof unknown_washer>;

export {};
