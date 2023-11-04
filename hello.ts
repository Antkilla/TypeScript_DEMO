//TypeScript:
//1. 'Syntactical superset' of JavaScript
//   built on top of JS, so it has all of the same features as JS
//   and then some. 
//2. Has 'static typing'
//   allows developers to define the structure of the data being 
//   used in your application

//Why use it?
//1. Spot errors early
//2. Write code that is more maintainable
//3. Developer tools

//node cannot run typescript in the same way it runs javascript
//typescript files need to first be compiled into regular javascript
//and THEN ran with node
//this only really applies when we are running isolated files,
//it's not something we will need to worry about inside of our React apps
//to compile ts into js, run the command 'tsc hello.ts'
//this will create a hello.js file, that can then be run with node

//my greet function takes in two parameters: person, which MUST be a string
//and date, which MUST be a Date object. The 'void' indicates that the function
//is not returning anything
function greet(person: string, date: Date): void {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

//runs the greet function with the name "Alice" and today's date
// greet(7, "Christmas");
greet("Alice", new Date());

//Examples of creating different variable types
let isDone: boolean = false;
let age: number = 42;
let firstName: string = "Alice";

//For collections like arrays, objects, etc. we not only 
//specify that it is an array (or object, etc) but also
//the type of data inside of it
let ids: number[] = [1, 2, 3]; //usually use this if the array type is relatively simple
let moreIds: Array<number> = [1, 2, 3]; //usually use this if the array type is more complex

//AVOID:
let notSure: any = 4; //any means it can be any type, but usually not a good idea to have arrays of mixed types

//Functions
//Functions need the types of their parameters as well as their return value specified.
//If nothing is going to be returned, then 'void' is the return type
function greeting(person: string, date: Date): void { //person parameter is a string, data parameter is a Date, returns nothing
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

//Write a function called add that takes in two number parameters x and y and returns another number, their sum
function add(x: number, y: number): number {
  return x + y;
}

const addUp = (x: number, y: number): number => x + y;

//Objects
//objects need the property names they should contain as well as the types of the values associated with those properties
let user1: {name: string, age: number} = {
  name: 'Alice',
  age: 25
}

let user2: {name: string, age: number} = {
  name: 'Bob',
  age: 65
}

let user3: {name: string, age: number} = {
  name: 'Cindy',
  age: 54
}

//writing out the type every single time can get annoying, ESPECIALLY if the object is more complex
//Interfaces
//Interfaces allow you to define your own blueprint for a type that can be referenced when that type
//is used in your code
interface User {
  name: string,
  age: number
}

let user4: User = {
  name: "Doug", 
  age: 33
}

//Examples
//Complete the function that accepts a string parameter, and reverses each word in the string. 
//All spaces in the string should be retained.
//"This is an example!" ==> "sihT si na !elpmaxe"

//helper function: reverseString. Takes in a string, returns the reversed version
function reverseString(myString: string): string {
  //takes the input string, splits it into an array of individual characters, 
  //reverses that array, and then rejoins the characters into a single string
  //and returns it
  return myString.split("").reverse().join("");
}

function reverseWords(myString: string): string {
  //split input string into array of individual words
  let words: string[] = myString.split(" ");
  //reversing each word in the array using map and our reverseString function
  let reversedWords: string[] = words.map((word) => reverseString(word));
  //rejoin all of the reversed words together into a string again
  let reversedString: string = reversedWords.join(" ");
  //return the reversed string
  return reversedString;
}

//single line implementation
// const revWords = (myStr: string): string => myStr.split(" ").map(word => word.split("").reverse().join("")).join(" ");

console.log(reverseWords("This is an example!"));
// console.log(revWords("This is an example!"));

//to test/run TypeScript code outside of a larger Node projects, we must
//first compile it into JavaScript using tsc in the terminal
//this creates a .js file that we can then run with node
//after we're done with the .js file we can just delete it


///////////////////////////////////////////////////////////////////////////////////////


//You are given an array of n+1 integers 1 through n. In addition there is a single duplicate integer. 
//The array is unsorted. You should return the duplicate value as a single integer.
//An example valid array would be [3, 2, 5, 1, 3, 4]. It has the integers 1 through 5 and 3 is duplicated. 
//[1, 2, 4, 5, 5] would not be valid as it is missing 3.

//create a functoin called findDuplicate that takes in nums, an array of numbers, and returns a number
function findDuplicate(nums: Array<number>): number | undefined {
  //sort the array in ascending (increasing) order
  //sort accepts a callback function that will be used to determine whether or not items in your array
  //are considered "less than" or "greater than" the next thing
  //sort takes in two parameters and will loop through your array setting one item to the first parameter
  //and the next item to the second parameter
  //it passes the parameters into the function and if the function returns TRUE then a and b are already
  //in the right order and the sort just moves on
  //if FALSE then a is greater than b, and sort swaps their places
  nums.sort((a, b) => a - b);

  //loop through the sorted array, stop one before the end
  for (let i = 0; i < nums.length - 1; i++) {
    //check if num at position i is the same as the num at position i+1
    if (nums[i] === nums[i + 1]) {
      //if it is, that's your duplicate. return it
      return nums[i];
    }
  }
  //return undefined if no duplicate found, because returning a default number could be confusing
  return undefined;
}

//[3, 2, 5, 1, 3, 4] when sort first runs, a = 3, b = 2
//[1, 2, 3, 3, 4, 5]


//using Set
//a set in JS/TS is a collection of items (similar to an array) that does not allow duplicates
function findDuplicate2(nums: number[]): number | undefined {
  //create an empty set/array to keep track of which numbers have been seen so far
  const seen: number[] = [];

  //loop through each num of the array
  for (let num of nums) {
    //check if the num is already in seen
    if (seen.include(num)) {
      //if so, that's your duplicate, return it
      return num;
    }
    //if not, add the num to seen
    seen.push(num);
  }
  //return undefined in case no duplicate found (and to appease TypeScript)
  return undefined;
}

console.log(findDuplicate([1, 5, 4, 2, 3, 4])); //4
console.log(findDuplicate2([9, 4, 6, 1, 2, 7, 3, 5, 9, 8])) //9


//////////////////////////////////////////////////////////////////////////

// Complete the function howManyDays. It accepts 1 parameter month, which means the month of the year. 
// Different months have a different number of days as shown in the table below. Return the number of days that are in month. 
// There is no need for input validation: month will always be greater than 0 and less than or equal to 12.

function howManyDays(month: number): number {
  switch(month) {
    //if month is 4, 6, 9, or 11, we should return 30
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    //if month is 2, should return 28
    case 2:
      return 28;
    //otherwise, return 31
    default:
      return 31;
  }
}

console.log(howManyDays(4)); //30
console.log(howManyDays(11)); //30
console.log(howManyDays(2)); //28
console.log(howManyDays(12)); //31