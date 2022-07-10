export type Constructor<T = unknown> = {[arg in number]: unknown} & {T: T};
export type $_<kind extends Constructor, args extends [...unknown[]]> =
   (kind & args)["T"];
