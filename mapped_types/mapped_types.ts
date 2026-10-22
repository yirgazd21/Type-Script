export {};

// -- What are Mapped Types?
// Transform every property in an existing type using a loop-like syntax
// Syntax: { [K in keyof T]: NewType }

// ── Basic mapped type — make all properties optional manually
type User = {
    id: number;
    fullName: string;
    email: string;
    age: number;
};

type MyPartial<T> = {
    [K in keyof T]?: T[K]; // loop over each key, make it optional
};

type OptionalUser = MyPartial<User>;
// same as: { id?: number; fullName?: string; email?: string; age?: number }

// ── Make all properties readonly manually
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

type FrozenUser = MyReadonly<User>;
const frozenUser: FrozenUser = { id: 1, fullName: "Abebe", email: "a@gmail.com", age: 21 };
// frozenUser.age = 22; // Error: readonly

// ── Make all properties required manually
type MyRequired<T> = {
    [K in keyof T]-?: T[K]; // -? removes the optional modifier
};

// ── Make all properties nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
const nullUser: NullableUser = { id: 1, fullName: null, email: null, age: null };
console.log(nullUser); // { id: 1, fullName: null, email: null, age: null }

// ── Change all values to a specific type
type Stringify<T> = {
    [K in keyof T]: string;
};

type StringUser = Stringify<User>;
const strUser: StringUser = { id: "1", fullName: "Hana", email: "h@gmail.com", age: "20" };
console.log(strUser);

// ── Record<K, V> is a mapped type internally
// type Record<K extends string, V> = { [P in K]: V }
type Roles = "admin" | "editor" | "viewer";
type Permissions = { [K in Roles]: boolean };

const access: Permissions = { admin: true, editor: true, viewer: false };
console.log(access); // { admin: true, editor: true, viewer: false }

// ── Map over a union to create object types
type EventMap = {
    [K in "click" | "hover" | "focus"]: (event: string) => void;
};

const handlers: EventMap = {
    click: (e) => console.log(`Clicked: ${e}`),
    hover: (e) => console.log(`Hovered: ${e}`),
    focus: (e) => console.log(`Focused: ${e}`),
};
handlers.click("button"); // "Clicked: button"

// ── Remapping keys with as (rename keys while mapping)
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getFullName: () => string;
//   getEmail: () => string;
//   getAge: () => number;
// }

const userGetters: UserGetters = {
    getId: () => 1,
    getFullName: () => "Abebe",
    getEmail: () => "a@gmail.com",
    getAge: () => 21,
};
console.log(userGetters.getFullName()); // "Abebe"

// ── Filter keys using as + never (exclude certain properties)
type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type StringOnlyUser = OnlyStrings<User>;
// { fullName: string; email: string } — only string properties

// ── Real-world: create a type for a form's validation errors
type FormErrors<T> = {
    [K in keyof T]?: string; // each field can have an optional error message
};

type UserFormErrors = FormErrors<User>;

const errors: UserFormErrors = {
    email: "Invalid email format",
    age: "Must be at least 18",
};
console.log(errors); // { email: "Invalid email format", age: "Must be at least 18" }
