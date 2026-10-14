// -- Declaration
let scoress: number[] = [70, 80, 90];
let namess: string[] = ["Abebe", "Hana"];
let prices: Array<number> = [100, 200, 300]; // alternative syntax

// -- Mixed types
let mixed: (string | number)[] = ["Abebe", 25, "Hana", 30];

// -- CRUD
let fruits: string[] = ["Apple", "Banana", "Mango"];
console.log(fruits[0]);         // read: "Apple"
fruits[1] = "Orange";           // update
fruits.push("Grape");           // add to end
fruits.pop();                   // remove from end
fruits.unshift("Strawberry");   // add to beginning
fruits.shift();                 // remove from beginning

// -- Common methods
const nums: number[] = [5, 3, 8, 1, 9, 2];

const sorted = [...nums].sort((a, b) => a - b); // [1, 2, 3, 5, 8, 9]
const filtered = nums.filter((n) => n > 4);      // [5, 8, 9]
const doubled = nums.map((n) => n * 2);          // [10, 6, 16, 2, 18, 4]
const found = nums.find((n) => n > 6);           // 8
const sum = nums.reduce((total, n) => total + n, 0); // 28
const idx = nums.indexOf(8);                     // 2
const joined = nums.join(", ");                  // "5, 3, 8, 1, 9, 2"

console.log(nums.includes(3));   // true
console.log(nums.every((n) => n > 0));  // true  — all items pass?
console.log(nums.some((n) => n > 8));   // true  — at least one passes?
console.log(nums.slice(1, 3));          // [3, 8] — copy a portion (non-destructive)

// splice: add/remove at a specific index (modifies original)
const colors: string[] = ["red", "green", "blue"];
colors.splice(1, 1, "yellow"); // removes "green", inserts "yellow"
console.log(colors);           // ["red", "yellow", "blue"]

// concat: merge two arrays
const a: number[] = [1, 2];
const b: number[] = [3, 4];
const merged = a.concat(b);   // [1, 2, 3, 4]

// flat: flatten nested arrays
const nested: number[][] = [[1, 2], [3, 4]];
console.log(nested.flat());   // [1, 2, 3, 4]

// forEach: loop through items
nums.forEach((n) => console.log(n));

// -- Truncate
const items: string[] = ["a", "b", "c", "d"];
items.length = 2;              // ["a", "b"]

// -- Readonly array (cannot be modified)
const constants: readonly number[] = [10, 20, 30];
// constants.push(40);  // Error
// constants[0] = 99;   // Error

// -- Tuple (fixed length and types)
let students: [string, number] = ["Abebe", 21];
console.log(students[0]); // "Abebe"
console.log(students[1]); // 21


interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

const products: Product[] = [
    { id: 1, name: "Keyboard", price: 1200, inStock: true },
    { id: 2, name: "Mouse", price: 600, inStock: false },
    { id: 3, name: "Monitor", price: 8200, inStock: true },
];

// .filter() -> preserves type Product[]
const availableProducts = products.filter((p) => p.inStock);

// .map() -> returns string[]
const proNames: string[] = products.map((p) => p.name);

// .reduce() -> calculates total sum (typed accumulator)
const totalPrice: number = products.reduce((total, p) => total + p.price, 0);
console.log(`Total: ${totalPrice}`); // 10000

//#############################################################################
// reduce method
const numbers = [1, 1, 2, 3];
// a = 0 , c = 1 =>a=1
// a = 1 , c=-1 Rightarrow a = 0
// a = 0 , c = 2 =>a=2
// a = 2 , c = 3 =>a=5
const sums = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
}, 0);
console.log(sums);


// if we ignore accumulator inital value it take first element for accumulator
// a = 1 , c = - 1 =>a=0
// a = 0 , c = 2 =>a=2
// a = 2 , c = 3 =>a=5
const totals = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
);
console.log(totals);

const getMax = (acc: number, curr: number): number => {
    return Math.max(acc, curr)
}
const maximum = numbers.reduce(getMax);
console.log(maximum);


