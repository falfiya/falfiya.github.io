function div<d extends number>(num: number, divisor: d & (d extends 0 ? void : d)): number;
function div<d extends number>(num: d extends 0 ? never : number, divisor: d): number;
function div(a: number, b: number): number {
   return a / b;
}

div(1, 0);

export {};
