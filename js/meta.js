/**
 * @typedef {object} TParenL
 * @property {"("} tag
 */
/**
 * @typedef {object} TParenR
 * @property {")"} tag
 */
/**
 * @typedef {object} TNum
 * @property {"num"} tag
 * @property {number} value
 */
/**
 * `\\` or `/` or `λ` or `&` work
 * @typedef {object} TLambda
 * @property {"λ"} tag
 */
/**
 * `->` or `.` work
 * @typedef {object} TArrow
 * @property {"->"} tag
 */
/**
 * @typedef {object} TVar
 * @property {"var"} tag
 * @property {string} id
 */
/**
 * @typedef {TParenL | TParenR | TNum | TLambda | TArrow | TVar} Token
 */

/**
 * @param {string} s
 * @returns {Token[]}
 */
function tokenize(s) {
   /** @type {Token[]} */
   const ts = [];

   while (s.length > 0) {
      { // Trim whitespace at the start
         const s_ = s.replace(/^\s*/, "");
         if (s !== s_) {
            s = s_;
            continue;
         }
      }

SINGLE_CHAR:
      { // Match for single character things
         /** @type {Token["tag"]} */
         let tag;
         switch (s[0]) {
            case "\\":
            case "/":
            case "&":
               tag = "λ";
               break;
            case ".":
               tag = "->";
               break;
            case "λ":
            case "(":
            case ")":
               tag = s[0];
               break;
            default:
               break SINGLE_CHAR; // ------------------------------------------@
         }                                                                  // |
         s = s.slice(1);                                                    // |
         ts.push({tag});                                                    // |
         continue;                                                          // |
      }                                                                     // |
      // <---------------------------------------------------------------------@

      { // Match for number
         const match = s.match(/(^\d+)([^]*$)/);
         if (match != null) {
            const [_, num, rest] = match;
            s = rest;
            ts.push({tag: "num", value: +num});
            continue;
         }
      }

      { // Match for arrow
         const match = s.match(/(^-+>)([^]*$)/);
         if (match != null) {
            const [_, __, rest] = match;
            s = rest;
            ts.push({tag: "->"});
            continue;
         }
      }

      { // match for variable
         const match = s.match(/(^[A-Za-z]+)([^]*$)/);
         if (match != null) {
            const [_, id, rest] = match;
            s = rest;
            ts.push({tag: "var", id});
            continue;
         }
      }
   }

   return ts;
}

/**
 * @typedef {object} ENum
 * @property {"num"} tag
 * @property {number} value
 */
/**
 * @typedef {object} EVar
 * @property {"var"} tag
 * @property {string} id
 */
/**
 * @typedef {object} ELam
 * @property {"lam"} tag
 * @property {string} param
 * @property {Expr} body
 */
/**
 * @typedef {object} EApp
 * @property {"app"} tag
 * @property {Expr} left
 * @property {Expr} right
 */
/**
 * @typedef {ENum | EVar | ELam | EApp} Expr
 */

/**
 * @param {Token[]} ts
 * @param {Expr | null} left
 * @param {Expr | null} right
 * @returns {[Expr | null, rest: Token[]]}
 */
function parse(ts, left = null, right = null) {
   if (right !== null) {
      if (left === null) {
         left = right;
      } else {
         left = {tag: "app", left, right};
      }
      right = null;
   }

   if (ts.length === 0) {
      return [left, []];
   }

   switch (ts[0].tag) {
      case "(":
         var [inside, ts_] = parse(ts.slice(1), left);
         ts = ts_;
         if (ts[0].tag === ")") {
            ts = ts.slice(1);
            return parse(ts, left, inside);
         } else {
            throw new Error("Unbalanced parens");
         }
      case "var":
      case "num":
         // TVar and TNum are the same in Expression land.
         return parse(ts.slice(1), left, ts[0]);
      case "λ":
         /** @type {ELam | null} */
         ts = ts.slice(1);
         if (ts.length === 0) {
            throw new Error("Unexpected end of input after λ");
         }
         if (ts[0].tag !== "var") {
            throw new Error("Expecting parameter");
         }
         const paramName = ts[0].id;
         ts = ts.slice(1);
         if (ts.length === 0) {
            throw new Error(`Unexpected end of input after λ ${paramName}`);
         }
         if (ts[0].tag !== "->") {
            throw new Error("Expecting arrow");
         }
         ts = ts.slice(1);
         var [body, ts_] = parse(ts);
         ts = ts_;
         return parse(ts, {tag: "lam", param: paramName, body});
      case ")":
         return [left, ts];
      case "->":
         throw new Error("Unexpected ->");
   }

   throw new Error("SANITY: Should never get here!");
}

/**
 * @typedef {string} VFun
 */
/**
 * @typedef {number | VFun} Value
 */
/**
 * @param {Expr} e
 * @returns {string}
 */
function lift(e) {
   switch (e.tag) {
      case "num":
         return `${e.value}`;
      case "lam":
         return `${e.param} => ${lift(e.body)}`;
      case "var":
         return e.id;
      case "app":
         return `(${lift(e.left)})(${lift(e.right)})`;
   }

   throw new Error("SANITY: Should never be here!");
}

/**
 * @param {Expr} __e
 * @returns {Value}
 */
function evaluate(__e) {
   return eval(lift(__e));
}

/**
 * @param {string} s
 */
function run(s) {
   console.log("input:", s);
   const ts = tokenize(s);
   // console.log("tokens:", ts);
   const [expr, ts_] = parse(ts);
   if (ts_.length !== 0) {
      throw new Error("SANITY: ts_ should be empty!");
   }
   // console.log("ast:", expr);
   console.log("lift:", lift(expr));
   const res = evaluate(expr);
   console.log("result:", res);
}

run("(/a -> a) (/b -> b) 1");
