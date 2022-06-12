// not my idea
// https://gist.github.com/ENvironmentSet/1662a140f99381bc85fd6be51ecdcbb5

const _ = 0 as never;

/** higher order function */
interface hof {
   arg: unknown;
   res: unknown;
}

interface hof_static {
   new(): hof;
   run(a: any): any;
}

class exclaim implements hof {
   arg: string
   = _;
   res: `${this["arg"]}!`
   = _;
   static run(s: string): `${string}!` {
      return `${s}!`;
   }
}

type apply<fn extends hof, arg> = ({arg: arg} & fn)["res"];
function apply
   <cls extends hof_static, arg>(cls: cls, arg: arg):
      apply<InstanceType<cls>, arg>
{
   return cls.run(arg);
}

type map_tpl<fn extends hof, tpl extends readonly [...any[]]> =
   tpl extends readonly []
   ? readonly []
   : tpl extends readonly [infer head, ...infer rest]
      ? [apply<fn, head>, ...map_tpl<fn, rest>]
      : never;

function map_tpl
   <cls extends hof_static, tpl extends readonly [...any[]]>(cls: cls, tpl: tpl):
      map_tpl<InstanceType<cls>, tpl>
{
   return tpl.map(elem => apply(cls, elem)) as any;
}

const words = ["higher", "kinded", "types"] as const;
type words = typeof words;

// first map at the type level
type WORDS = map_tpl<exclaim, words>; //:: ["higher!", "kinded!", "types!"]

// now map with both
const WORDS = map_tpl(exclaim, words); //:: ["higher!", "kinded!", "types!"]

export declare const dummy: void;
