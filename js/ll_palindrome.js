class Node {
   constructor (data, next = null) {
      this.data = data;
      this.next = next;
   }
   toString() {
      return `${this.data}->${this.next}`;
   }
}

function toLinkedList(s) {
   let root = null;
   let current = null;
   for (const c of s) {
      if (root == null) {
         root = new Node(c);
         current = root;
         continue;
      }
      current.next = new Node(c);
      current = current.next;
   }
   return root;
}

const t0 = toLinkedList("Hello, World!");
const t1 = toLinkedList("racecar");

function isPalindrome(node) {
   let reverseRoot = null;
   for (let n = node; n != null; n = n.next) {
      reverseRoot = new Node(n.data, reverseRoot);
   }
   let forwards = node;
   let backwards = reverseRoot;
   while (forwards != null) {
      if (forwards.data !== backwards.data) {
         return false;
      }
      forwards = forwards.next;
      backwards = backwards.next;
   }
   return true;
}

console.log(`${t0} Palindrome: ${isPalindrome(t0)}`);
console.log(`${t1} Palindrome: ${isPalindrome(t1)}`);
