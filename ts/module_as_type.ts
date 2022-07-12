interface Animal {
   name: string;
   speak(): void;
}

function speak(a: Animal) {
   a.speak();
}

import * as cat from "./module";

speak(cat);
