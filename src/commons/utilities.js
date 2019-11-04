"use strict";

class Utilities {
    constructor() {

    }

    distinctInArray(array, key) {
        let result = [],
            map = new Map();

        for (const item of array) {
            if (!map.has(item[key])) {
                map.set(item[key], true);
                result.push(item);
            }
        }

        return result;
    }
}