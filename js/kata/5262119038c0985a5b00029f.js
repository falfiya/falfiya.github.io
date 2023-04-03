function isPrime(num) {
   if (num<2) return false;
   for (let i = 2; i <= num**.5; i++) {
      if(num%i==0){
         return false;
      }
   }
   return true;
}

isPrime=n=>n>1&&[...Array(1+n**.5|0)].every((_,i)=>i<2|n%i)
