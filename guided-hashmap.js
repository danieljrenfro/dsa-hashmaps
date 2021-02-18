class HashMap {
  constructor(initialCapacity=8) {
    // the length of the hashmap
    this.length = 0;
    // the hashtable for the hashmap
    this._hashTable = [];
    // initially set to the initialCapacity value
    this._capacity = initialCapacity;
    // not totally sure what this variable is for
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  }
  
  // sets the key/value pair to a specific slot in the hash table
  set(key, value) {
    // a variable set to the length of the hashmap add the deleted add 1 divided by the capacity of the hashmap
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    
    // if the load ratio is greater than the MAX_LOAD_RATIO
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      // resize the hashmap using the SIZE_RATIO
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    
    // set the index to the returned value of the _findSlot method using the given key
    const index = this._findSlot(key);
    
    // if there is no value in the hashTable at the given index, increase the length of the hashmap, which means you are inserting the key/value pair.
    if (!this.hashTable[index]) {
      this.length++;
    }
    // then, set the value of the index in the hashTable to equal the key, value and set DELETED to equal false.
    this._hashTable[index] = {
      key, 
      value,
      DELETED: false
    };
  }

  delete(key) {
    // find the index for the key
    const index = this._findSlot(key);
    // find the slot in the index of the hashTable
    const slot = this._hashTable[index];
    // if slot is undefined, throw an error
    if (slot === undefined) {
      throw new Error('Key error');
    }
    // mark that slot's DELETED value to true
    slot.DELETED = true;
    // decrement the length of the hash map by 1
    this.length--;
    // increment the number of deleted items for the hash map by 1
    this._deleted++;
  }
  
  //  used to find the correct slot for a given key. This is called in the 'set' method.
  _findSlot(key) {
    // calculates the hash of the key
    const hash = HashMap._hashString(key);
    // uses modulo on the hash to find a slot for the key within the current capacity.
    const start = hash % this._capacity;
    
    // loops through the array, stopping when it finds the slot with a matching key or an empty slot.
    for (let i = start; i < start + this._capacity; i++) {
      // the index is set to i modulo the capacity of the hashmap
      const index = i % this._capacity;
      // the slot is set to the hashTable position at index
      const slot = this._hashTable[index];
      // if the slot is empty because it is undefined or the key in the slot already equals the key and the item hasn't been deleted
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        // return the index
        return index;
      }
    }
  }
  
  // in this case, size is passed into this function call by the set() function.
  _resize(size) {
    // store the previous hashTable in a variable called oldSlots
    const oldSlots = this._hashTable;
    // set the capacity for the hashMap to the size argument
    this._capacity = size;
    // set the length of the hashmap to 0. As you go through and set values from the oldSlots to the new hashTable this length will go up
    this.length = 0;
    // set the hashTable to a new empty array
    this._hashTable = [];
    
    // loop through all of the slots from the oldSlots variable
    for (const slot of oldSlots) {
      // if the slot has a key/value pair execute this block of code
      if (slot !== undefined && !slot.DELETED) {
        // set the key/value of the slot to the new hashTable
        this.set(slot.key, slot.value);
      }
    }
  }
  
  // Take a string and returns a number
  static _hashString(string) {
    // sets the hash number to 5381
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;