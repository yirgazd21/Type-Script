export {};

// -- What are Conditional Types?
// Type-level if/else — choose a type based on a condition
// Syntax: T extends U ? TypeIfTrue : TypeIfFalse

// ── Basic conditional type
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
type C = IsString<boolean>; // "no"

// ── Practical: check if T is an array
type IsArray<T> = T extends any[] ? "array" : "not array";

type D = IsArray<number[]>; // "array"
type E = IsArray<string>;   // "not array"

// ── Unwrap array item type
type UnpackArray<T> = T extends (infer Item)[] ? Item : T;

type F = UnpackArray<string[]>; // string
type G = UnpackArray<number[]>; // number
type H = UnpackArray<boolean>;  // boolean (not an array, returns T itself)

// ── infer keyword: extract a type from inside another type
// infer = "figure out this type for me"

// Extract return type of a function (like built-in ReturnType<T>)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() { return { id: 1, fullName: "Abebe" }; }
function greet(name: string): string { return `Hello, ${name}`; }

type I = MyReturnType<typeof getUser>; // { id: number; fullName: string }
type J = MyReturnType<typeof greet>;   // string
type K = MyReturnType<number>;         // never (not a function)

// Extract first parameter type
type FirstParam<T> = T extends (first: infer P, ...rest: any[]) => any ? P : never;

function login(email: string, password: string): boolean { return true; }

type L = FirstParam<typeof login>; // string

// Extract Promise resolved value (like built-in Awaited<T>)
type MyAwaited<T> = T extends Promise<infer V> ? V : T;

type M = MyAwaited<Promise<string>>;  // string
type N = MyAwaited<Promise<number>>;  // number
type O = MyAwaited<boolean>;          // boolean (not a Promise)

// ── Distributive conditional types
// When T is a union, the condition is applied to each member separately
type ToArray<T> = T extends any ? T[] : never;

type P = ToArray<string | number>;
// = ToArray<string> | ToArray<number>
// = string[] | number[]

// ── Exclude and Extract are built using conditional types
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;

type AllRoles = "admin" | "editor" | "viewer" | "guest";

type NoGuest  = MyExclude<AllRoles, "guest">;          // "admin" | "editor" | "viewer"
type OnlyAdmin = MyExtract<AllRoles, "admin" | "editor">; // "admin" | "editor"

// ── NonNullable is also a conditional type
type MyNonNullable<T> = T extends null | undefined ? never : T;

type Q = MyNonNullable<string | null | undefined>; // string

// ── Nested conditional types
type TypeLabel<T> =
    T extends string  ? "string"  :
    T extends number  ? "number"  :
    T extends boolean ? "boolean" :
    T extends any[]   ? "array"   :
    T extends object  ? "object"  :
    "unknown";

type R = TypeLabel<string>;   // "string"
type S = TypeLabel<42>;       // "number"
type T2 = TypeLabel<boolean>; // "boolean"
type U2 = TypeLabel<string[]>;// "array"
type V = TypeLabel<{}>;       // "object"

// ── Conditional-like return type using function overloads (correct pattern)
// TypeScript can't narrow conditional return types inside a function body,
// so we use overloads to declare what each input type returns
function processValue(value: string): string[];
function processValue(value: number): number;
function processValue(value: string | number): string[] | number {
    if (typeof value === "string") {
        return value.split("");   // returns string[]
    }
    return value * 2;             // returns number
}

const chars = processValue("hello"); // string[] → ["h","e","l","l","o"]
const doubled = processValue(5);     // number   → 10
console.log(chars);   // ["h","e","l","l","o"]
console.log(doubled); // 10
