// taken from based-canvas
declare const _: unique symbol;

type DisplayPixels = number & { readonly [_]: unique symbol };
type RasterUnits = number & { readonly [_]: unique symbol };
type CSSPixels = number & { readonly [_]: unique symbol };
