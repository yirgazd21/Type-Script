export {}; // makes this file a module (own scope, no global conflicts)

// -- Basic object with inline type
let user: { name: string; age: number; email: string } = {
    name: "Abebe",
    age: 21,
    email: "abebe@gmail.com",
};
console.log(user.name); // "Abebe"

// -- Type alias for reusable object shape
type Student = {
    name: string;
    age: number;
    grade: string;
};

const student: Student = { name: "Hana", age: 20, grade: "A" };

// -- Optional property (age may or may not exist)
type Person = {
    name: string;
    age?: number; // optional
};

const p1: Person = { name: "Abel" };          // valid without age
const p2: Person = { name: "Dani", age: 25 }; // valid with age

// -- Readonly property (cannot be changed after creation)
type Config = {
    readonly host: string;
    port: number;
};

const config: Config = { host: "localhost", port: 3000 };
// config.host = "other"; // Error: cannot assign to 'host'
config.port = 8080; // OK

// -- Nested object
type Address = {
    city: string;
    country: string;
};

type Employee = {
    name: string;
    address: Address;
};

const emp: Employee = {
    name: "Yonas",
    address: { city: "Addis Ababa", country: "Ethiopia" },
};
console.log(emp.address.city); // "Addis Ababa"

// -- Object with method
type Rectangle = {
    width: number;
    height: number;
    area: () => number;
};

const rect: Rectangle = {
    width: 10,
    height: 5,
    area() {
        return this.width * this.height;
    },
};
console.log(rect.area()); // 50

// -- Destructuring
const { name: fullName, age: studentAge } = student;
console.log(fullName, studentAge); // "Hana" 20

// -- Rename while destructuring
const { name: studentName } = student;
console.log(studentName); // "Hana"

// -- Default value while destructuring
const { age: personAge = 18 } = p1; // p1 has no age, uses default 18
console.log(personAge); // 18

// -- Spread operator (copy + override)
const original: Student = { name: "Abel", age: 22, grade: "B" };
const updated = { ...original, grade: "A" }; // override grade
console.log(updated); // { name: "Abel", age: 22, grade: "A" }

// -- Array of objects
type Product = {
    id: number;
    name: string;
    price: number;
};

const products: Product[] = [
    { id: 1, name: "Keyboard", price: 1200 },
    { id: 2, name: "Mouse", price: 600 },
    { id: 3, name: "Monitor", price: 8200 },
];

// find product by id
const keyboard = products.find((p) => p.id === 1);
console.log(keyboard?.name); // "Keyboard"

// get all names
const productNames = products.map((p) => p.name);
console.log(productNames); // ["Keyboard", "Mouse", "Monitor"]

// total price
const total = products.reduce((sum, p) => sum + p.price, 0);
console.log(`Total: ${total}`); // 10000
