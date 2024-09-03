// this is a test for using generators in `ampm`
export {}

/**
 * Taken directly from ampm/src/core/srcref.ts
 */
class Position {
   constructor (
      public offset: number,
      public lineNumber: number,
      public lineOffset: number,
   ) {}
   char(): number {
      return this.offset - this.lineOffset;
   }
   here(): Selection & {count: 1} {
      return new Selection(
         this.offset,
         this.lineNumber,
         this.lineOffset,
         1,
      ) as never;
   }
   till(end: Position): Selection {
      return new Selection(
         this.offset,
         this.lineNumber,
         this.lineOffset,
         end.offset - this.offset,
      );
   }
   through(sel: Selection): Selection {
      return new Selection(
         this.offset,
         this.lineNumber,
         this.lineOffset,
         sel.offset + sel.count - this.offset,
      );
   }
}
/**
 * Taken directly from ampm/src/core/srcref.ts
 */
class Selection extends Position {
   count: number;
   constructor (copy: Selection)
   constructor (offset: number, lineNumber: number, lineOffset: number, count: number)
   constructor (...args: [copy: Selection] | [offset: number, lineNumber: number, lineOffset: number, count: number]) {
      if (args.length === 1) {
         const [copy] = args;
         super(copy.offset, copy.lineNumber, copy.lineOffset);
         this.count = copy.count;
      } else {
         const [offset, lineNumber, lineOffset, count] = args;
         super(offset, lineNumber, lineOffset);
         this.count = count;
      }
   }
   text(src: string): string {
      return src.slice(this.offset, this.offset + this.count);
   }
}

class GrowableSourceFile {
   constructor (public src: string) {}

   grow(more: string) {
      this.src += more;
   }
}

class StringCursor extends Position {
   constructor (public src: string) {
      super(0, 0, 0);
   }
   current(): string | undefined {
      return this.src[this.offset];
   }
   bump() {
      if (this.current() === "\n") {
         this.lineNumber++;
         this.lineOffset = this.offset + 1;
      }
      this.offset++;
   }
   pos(): Position {
      return new Position(this.offset, this.lineNumber, this.lineOffset);
   }
}

type Token =
   | WhiteSpaceToken
   | NumberToken
   | WordToken;

type WhiteSpaceToken = {
   type: "whitespace";
   sel: Selection;
};

type NumberToken = {
   type: "number";
   sel: Selection;
   value: number;
};

type WordToken = {
   type: "word";
   sel: Selection;
   value: string;
};

function* tokenize(): Generator<null, Token, string> {
   
}
