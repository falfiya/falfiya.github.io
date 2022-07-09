export type Constructor = {[arg in number]: unknown} & {T: unknown};
export type $_<kind extends Constructor, args extends [...unknown[]]> =
   (kind & args)["T"];
