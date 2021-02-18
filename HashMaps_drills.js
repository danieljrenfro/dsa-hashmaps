const HashMap = require('./hashmap');

function main() {
  let lotr = new HashMap();

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');

  console.log('LOTR HashMap', lotr);

  console.log('Hobbit Key:', lotr.get('Hobbit'));
  console.log('Maiar Key:', lotr.get('Maiar'));
  
  // In the cases of Hobbit and Maiar, I guess that we wrote over the previously set values of Bilbo and The Necromancer. There is a discrepancy. You might've expected to get Bilbo and Frodo for Hobbit and The Necromancer and Sauron for Maiar, but in our _findSlot function we return an index if the index in the hashTable is undefined or if the key already in the index matches the key that we are trying to set, thus allowing for an overwrite of the value already stored at a given index.

  // The capacity of my HashMap after I've hashed all of the above items is 24. That is because whenever we hit the MAX_LOAD_RATIO, we resize the HashTable. The SIZE_RATIO we resize it by is 3. So we had to resize the capacity once. It has an initial capacity of 8. When we breached the MAX_LOAD_RATIO we increased the size by multiplying the current capacity by 3 thus increasing it to 24. We have not breached the MAX_LOAD_RATIO again, when we do it will push the capacity to 72. 
}

const WhatDoesThisDo = function() {
  // we store one string that says 'Hello World.'
  let str1 = 'Hello World.';
  // we store another string in a different variable that also says 'Hello World'
  let str2 = 'Hello World.';
  // we instantiate a new hash map to the variable map1
  let map1 = new HashMap();
  // we set a new key/value pair with str1 being the key and 10 being the value.
  map1.set(str1,10);
  // we set another key/value pair with str2 being the key and 20 being the value. Since str2 will hash to the same value as str1 the value of str2 overwrites the value of str1 in the same place in the hash.
  map1.set(str2,20);
  // instantiate a new hash map to the variable map2
  let map2 = new HashMap();
  // instantiate a variable called str3 that has the value of str1
  let str3 = str1;
  // instantiate a variable called str4 that has the value of str2
  let str4 = str2;
  // This time we set a key/value pair to the map2 with str3 being the key for the value 20.
  map2.set(str3,20);
  // set the key of str4 to the value of 10, overwriting the value of the previously set key/value
  map2.set(str4,10);

  // when we console log the value that we get from str1 we'll get the value 20
  console.log(map1.get(str1));
  // when we console log the value that we get from str3 we'll get the value 10
  console.log(map2.get(str3));

  // the reason we get this values returned from getting str1 and str3 is because the values are being overwritten when we hash the second key/value pairs to the same key location.
};


WhatDoesThisDo();
main();