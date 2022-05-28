type tuple<length extends number, cur extends [...void[]] = []> =
   cur["length"] extends length
   ? cur
   : tuple<length, [void, ...cur]>;

function add
   <a extends number, b extends number>(a: a, b: b):
      [...tuple<a>, ...tuple<b>]["length"]
{
   (a as any) |= 0;
   (b as any) |= 0;
   return (a + b) as any;
}

const three = add(1, 2);
