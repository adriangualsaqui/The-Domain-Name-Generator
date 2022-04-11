// example data
const exampleArray = [10, 4, 100, 35, 31, 23, 443, 221, 342, 10, 12, 42];
const shit = ["function", null, function() {}, () => {}, 10, 100, {}];
const exampleArray2 = [
    [10, 4, "100", 35, "31", "23", 443, "221", "342", 10, 12, 42]
]

//object
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// My proposals

/**
 * Exercise 1
 * imperative
 */

/**
 * Search for all the positios with a value in a array and return an array of indexes.
 * @param {*} array Array where to search
 * @param {*} value Value for search to
 * @returns indexes array 
 */
function findInArray(array,value) {
    if ( ! Array.isArray(array) ) {
        console.error('First argument must be an array');
        return;
    }
    const indexes = [];
    for ( idx in array ) if ( array[idx] === value) indexes[indexes.length] = idx
    return indexes
}
/* Tests */
//console.log(findInArray('',1))
//console.log(findInArray([0,1,2,3,4,1],1))
//console.log(findInArray([0,1,2],3))
console.log('Ejercicio 1 imperativo:', findInArray(exampleArray,4))

/**
 * Exercise 1
 * declarative
 */

/**
 * Similar to previous.
 * @param {*} array 
 * @param {*} value 
 * @returns array of indexes
 */
function findInArrayDeclarative(array,value) {
    if ( ! Array.isArray(array) ) {
        console.error('First argument must be an array');
        return;
    }
    const indexes = [];
    array.forEach( (item, idx) => {
        if (value === item) indexes.push(idx)
        return
    } );
    return indexes;
}
/* Tests */
//console.log(findInArrayDeclarative('',1))
//console.log(findInArrayDeclarative([0,1,2,3,4],1))
//console.log(findInArrayDeclarative([0,1,2],3))
console.log('Ejercicio 1 declarativo:',findInArrayDeclarative(exampleArray,4))

/**
 * Exercise 2
 */

/**
 * Retorna un array con los string encontrados en el array proporcionado
 * @param {*} array 
 * @returns {String} array
 */
function getStrings(array) {
    if ( Array.isArray(array) ) {
        return array.filter(
            item => typeof(item) === "string"
        )
    } else {
        console.error('You must to provide a array.')
        return false
    }
}
/* Tests */
console.log('Ejercicio 2:', getStrings(shit))

/**
 * Ejercicio 3
 */

/**
 * Distance between tow point in x and y axis.
 * @param {number} x 
 * @param {number} y 
 */
function Distance(x,y) {
    this.x = x;
    this.y = y;
}

/**
 * Get two points and return x and y distance.
 * @param {Point} p1 
 * @param {Point} p2 
 * @returns {Distance||Error}  
 */
function getDistance(p1, p2) {
    return p1 instanceof Point && p2 instanceof Point ? new Distance(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) : new Error('Arguments must be Point instances')
}

// Tests
const p1 = new Point(1,2)
const p2 = new Point(3,1)
console.log('Ejerecicio 3:',getDistance(p1, p2))
//console.log(getDistance(p1, 55))

/**
 * Ejercicio 4
 */

/**
 * Distance between tow point in x and y axis.
 * @static {object} resultCodes nemonic-numeric mapping result codes 
 * @param {Result.resultCodes.*} code Comparation result: >=0 equal <0 different
 * @param {number} path Path to element relative to root array
 */
class Result {
    static resultCodes = {
        reference: 0,
        sameContents: 1,
        noArray: -1,
        differentLength: -2,
        differentContents: -3
    }
    constructor (code, path) {
        this.code = code;
        this.path = path;
    }
}

/**
 * Compares two arrays and outputs a numeric result code.
 * @param {Array} array First array for comparison
 * @param {Array} referenceArray Second array for comparison
 * @returns {Result.resultCodes} 
 */
function compareArrays(array, referenceArray) {
    if ( array.length !== referenceArray.length ) return Result.resultCodes.differentLength;
    if ( array === referenceArray ) return Result.resultCodes.reference;
    return array.every( (item, idx) => item === referenceArray[idx] ) ? Result.resultCodes.sameContents : Result.resultCodes.differentContents;
}

/**
 * 
 * @param {*} referenceArray 
 * @param {*} arrayForSearchOn 
 * @param {*} results 
 * @param {*} path 
 * @returns 
 */
function findEqualArrays(referenceArray, arrayForSearchOn, results = [], path = []) {
    if ( !Array.isArray(referenceArray) ) return new Error('Reference array... must be an array');
    if ( !Array.isArray(arrayForSearchOn) ) results.push(new Result(Result.resultCodes.noArray, path))
    else {
        results.push(new Result(compareArrays(referenceArray, arrayForSearchOn),path));
        arrayForSearchOn.forEach( (item, idx) => findEqualArrays(referenceArray, item, results, [...path, idx]) ) // Implicit returns kills instance
    }
    return results;
}

// Tests
const exampleArray3 = [
    [10, 4, 100, 35, 31, 23, 443, 221, 342, 10, 12, 42],
    exampleArray,
    [10, 4, "100", 35, "31", "23", 443, "221", "342", 10, 12, 42],
]
console.log("Ejercicio 4:",JSON.stringify(findEqualArrays(exampleArray, exampleArray3)))
console.log("Ejercicio 4:",JSON.stringify(findEqualArrays(exampleArray, exampleArray2)))