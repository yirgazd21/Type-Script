export {};

// -- What is an Intersection Type?
// Combines multiple types into ONE — the result must have ALL properties
// Uses the & operator

// ── Basic intersection
type HasName = { fullName: string };
type HasAge  = { age: number };

type Person = HasName & HasAge; // must have BOTH fullName AND age

const p1: Person = { fullName: "Abebe", age: 21 }; // ✅
console.log(p1.fullName, p1.age); // "Abebe" 21

// ── Intersection of 3 types
type HasEmail = { email: string };
type FullPerson = HasName & HasAge & HasEmail;

const p2: FullPerson = { fullName: "Hana", age: 20, email: "hana@gmail.com" };
console.log(p2); // { fullName: "Hana", age: 20, email: "hana@gmail.com" }

// ── Intersection with interfaces
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

type Amphibious = Flyable & Swimmable;

const duck: Amphibious = {
    fly()  { console.log("Flying!"); },
    swim() { console.log("Swimming!"); },
};
duck.fly();   // "Flying!"
duck.swim();  // "Swimming!"

// ── Real-world use: extend a base type without modifying it
type BaseProduct = {
    id: number;
    title: string;
    price: number;
};

type WithDiscount = BaseProduct & { discount: number };
type WithStock    = BaseProduct & { inStock: boolean };

const saleItem: WithDiscount = { id: 1, title: "Laptop", price: 12000, discount: 10 };
const storeItem: WithStock   = { id: 2, title: "Phone",  price: 5000,  inStock: true };

console.log(`${saleItem.title} — ${saleItem.discount}% off`); // "Laptop — 10% off"
console.log(`${storeItem.title} in stock: ${storeItem.inStock}`); // "Phone in stock: true"

// ── Intersection in function parameters
type Serializable  = { serialize(): string };
type Loggable      = { log(): void };

function processItem(item: Serializable & Loggable): void {
    item.log();
    console.log(item.serialize());
}

const myItem: Serializable & Loggable = {
    serialize() { return JSON.stringify({ id: 1 }); },
    log()       { console.log("Logging item..."); },
};
processItem(myItem);
// "Logging item..."
// '{"id":1}'

// ── Intersection vs Union
type A = { x: number };
type B = { y: number };

type UnionAB = A | B;        // has x OR y (one of them)
type IntersectAB = A & B;    // has x AND y (both required)

const unionVal: UnionAB = { x: 1 };          // valid — only x needed
const intersectVal: IntersectAB = { x: 1, y: 2 }; // both required
console.log(intersectVal); // { x: 1, y: 2 }

// ── Intersection with overlapping properties (same type → fine)
type C = { id: number; label: string };
type D = { id: number; value: number };
type CD = C & D; // id must satisfy BOTH — number & number → number ✅

const cd: CD = { id: 1, label: "item", value: 100 };
console.log(cd);

// ── Intersection with overlapping properties (different types → never)
type E = { code: string };
type F = { code: number };
type EF = E & F;
// EF.code would be string & number = never (impossible type)
// const ef: EF = { code: "x" }; // Error: no value can satisfy both
