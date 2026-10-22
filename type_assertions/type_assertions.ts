export {};

// -- What is Type Assertion?
// You tell TypeScript: "I know more than you — trust me, this is type X"
// It does NOT convert the value — it only tells the compiler what type to use

// ── as keyword (most common way)
let input: unknown = "Hello, TypeScript!";
let strLength = (input as string).length;
console.log(strLength); // 17

// ── Angle bracket syntax <T> (older style, not allowed in JSX)
let anotherInput: unknown = "Abebe";
let len = (<string>anotherInput).length;
console.log(len); // 5

// ── Common use: DOM elements
// Without assertion — TypeScript only knows it's HTMLElement | null
// const btn = document.getElementById("myBtn");
// btn.click(); // Error: btn might be null

// With assertion — we know it's a button
// const btn = document.getElementById("myBtn") as HTMLButtonElement;
// btn.click(); // OK

// ── Asserting unknown to a specific type
function getInput(): unknown {
    return "yirgazd@gmail.com";
}
const email = getInput() as string;
console.log(email.toUpperCase()); // "YIRGAZD@GMAIL.COM"

// ── Non-null assertion operator !
// Tells TypeScript: "this value is NOT null or undefined"
let maybeValue: string | null = "Hana";
let definiteValue = maybeValue!; // removes null from the type
console.log(definiteValue.toUpperCase()); // "HANA"

// Useful with DOM:
// const el = document.getElementById("title")!; // guaranteed not null
// el.innerText = "Hello";

// ── as unknown as T: double assertion (escape hatch — use carefully!)
// When direct assertion fails because types are too different
let numValue: number = 42;
let strValue = numValue as unknown as string; // force cast
// This works at compile time but has no actual runtime conversion
console.log(typeof strValue); // still "number" at runtime!

// ── Type assertion with objects
type User = { fullName: string; age: number };

const rawData = {} as User; // tells TS: treat this as User
rawData.fullName = "Abebe";
rawData.age = 21;
console.log(rawData); // { fullName: "Abebe", age: 21 }

// ── satisfies operator (TypeScript 4.9+)
// Like assertion but TypeScript still checks the value matches the type
type Palette = {
    red: string | [number, number, number];
    green: string | [number, number, number];
};

const colors = {
    red: [255, 0, 0],
    green: "green",
} satisfies Palette;

// TypeScript knows red is number[] (not string), green is string
console.log(colors.red[0]);      // 255 — array methods available
console.log(colors.green.toUpperCase()); // "GREEN" — string methods available

// ── When NOT to use assertion
// Don't use it to silence errors — fix the actual type issue instead
// Bad:
// const val = someFunction() as string; // if someFunction returns number, this is wrong
// Good: fix the type of someFunction to return string

// ── Summary of assertion syntax
// value as Type          → preferred way
// <Type>value            → old style, avoid in JSX files
// value!                 → non-null assertion
// value as unknown as T  → double assertion (last resort)
// value satisfies Type   → validates AND keeps specific type (TS 4.9+)
