export {}

type Node = InternalNode | LeafNode;

function indent(s: string): string {
   return s.split("\n").map(line => `   ${line}`).join("\n");
}

class InternalNode {
   type = "Internal";
   count: number;
   constructor (
      public left: Node,
      public right: Node,
   ) {
      this.count = left.count + right.count;
   }
}

class LeafNode {
   type = "Leaf";
   constructor (
      public count: number,
      public letter: string,
   ) {}
}

// this particular priority stack keeps the lowest count on the right
class PriorityStack {
   stack: Node[] = [];
   add(n: Node) {
      if (this.stack.length === 0) {
         this.stack.push(n);
         return;
      }
      if (this.stack.length === 1) {
         
      }
   }
   pop()
}

class BinarySearchTree {
   root: Node | null = null;
   add(n: Node) {
      let current = this.root;
      while (this.root !== null) {
         
      }
   }
}

function huffmanTree(s: string): Node {
   if (s.length < 1) {
      throw new Error("The input length must be at least 1 character");
   }
   const counts: {[char in string]?: number} = {};
   for (const c of s) {
      counts[c] = (counts[c] ?? 0) + 1;
   }
   // lowest count on the right side
   const priorityStack = [];
   for (const [char, count] of Object.entries(counts)) {
      priorityStack.push(new LeafNode(Number(count), char));
   }
   // priority stack length will always be at least 1
   // action to be taken on a length of 2 or more
   while (priorityStack.length > 1) {
      const l = priorityStack.length;
      const last = priorityStack[l - 1]!;
      const secondLast = priorityStack[l - 2]!;
      const combined = new InternalNode(last, secondLast);
      
   }
}

function 

console.log(huffmanTree("Hello, World!"));
