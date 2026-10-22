export {};

// -- typeof: narrow primitive types
function printValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.toUpperCase()); // string methods available
    } else {
        console.log(value.toFixed(2));    // number methods available
    }
}
printValue("hello"); // "HELLO"
printValue(3.14159); // "3.14"

// -- typeof with multiple types
function describe(value: string | number | boolean): string {
    if (typeof value === "string") return `String: ${value}`;
    if (typeof value === "number") return `Number: ${value}`;
    return `Boolean: ${value}`;
}
console.log(describe("Abebe")); // "String: Abebe"
console.log(describe(42));      // "Number: 42"
console.log(describe(true));    // "Boolean: true"

// -- instanceof: narrow class instances
class Dog {
    bark() { console.log("Woof!"); }
}
class Cat {
    meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark(); // TypeScript knows it's Dog
    } else {
        animal.meow(); // TypeScript knows it's Cat
    }
}
makeSound(new Dog()); // "Woof!"
makeSound(new Cat()); // "Meow!"

// -- in operator: check if a property exists on an object
type Admin = { role: string; permissions: string[] };
type RegularUser = { username: string };

function checkUser(user: Admin | RegularUser): void {
    if ("permissions" in user) {
        console.log(`Admin with permissions: ${user.permissions.join(", ")}`);
    } else {
        console.log(`User: ${user.username}`);
    }
}
checkUser({ role: "admin", permissions: ["read", "write"] }); // "Admin with permissions: read, write"
checkUser({ username: "Abebe" });                             // "User: Abebe"

// -- Discriminated union: use a shared 'kind' field to narrow
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2; // TypeScript knows it's Circle
    } else {
        return shape.width * shape.height;  // TypeScript knows it's Rectangle
    }
}
console.log(getArea({ kind: "circle", radius: 5 }).toFixed(2));      // "78.54"
console.log(getArea({ kind: "rectangle", width: 10, height: 4 }));   // 40

// -- Nullish narrowing: handle null and undefined
function greet(name: string | null | undefined): void {
    if (name === null) {
        console.log("Name is null");
    } else if (name === undefined) {
        console.log("Name is undefined");
    } else {
        console.log(`Hello, ${name}!`);
    }
}
greet("Hana");      // "Hello, Hana!"
greet(null);        // "Name is null"
greet(undefined);   // "Name is undefined"

// -- Nullish coalescing ??: use default if null or undefined
function getUsername(name: string | null | undefined): string {
    return name ?? "Guest"; // if null or undefined → use "Guest"
}
console.log(getUsername("Abebe")); // "Abebe"
console.log(getUsername(null));    // "Guest"
console.log(getUsername(undefined)); // "Guest"

// -- Optional chaining ?.: safely access nested properties
type UserProfile = {
    fullName: string;
    address?: {
        city: string;
    };
};

const user1: UserProfile = { fullName: "Hana", address: { city: "Addis Ababa" } };
const user2: UserProfile = { fullName: "Dani" }; // no address

console.log(user1.address?.city); // "Addis Ababa"
console.log(user2.address?.city); // undefined (no error)

// -- Custom type guard (is keyword): reusable guard function
type Fish = { swim(): void };
type Bird = { fly(): void };

function isFish(animal: Fish | Bird): animal is Fish {
    return (animal as Fish).swim !== undefined;
}

function move(animal: Fish | Bird): void {
    if (isFish(animal)) {
        animal.swim(); // TypeScript knows it's Fish
    } else {
        animal.fly();  // TypeScript knows it's Bird
    }
}

const fish: Fish = { swim() { console.log("Swimming!"); } };
const bird: Bird = { fly() { console.log("Flying!"); } };

move(fish); // "Swimming!"
move(bird); // "Flying!"

// -- Exhaustive check with never: ensure all cases are handled
type Status = "active" | "inactive" | "pending";

function handleStatus(status: Status): string {
    switch (status) {
        case "active":   return "User is active";
        case "inactive": return "User is inactive";
        case "pending":  return "User is pending";
        default:
            const _check: never = status; // Error if a case is missed
            return _check;
    }
}
console.log(handleStatus("active")); // "User is active"
