export {};

// Base type used throughout examples
type User = {
    id: number;
    fullName: string;
    email: string;
    age: number;
};

// ── Partial<T>: makes all properties optional
type PartialUser = Partial<User>;
// same as: { id?: number; fullName?: string; email?: string; age?: number }

function updateUser(current: User, changes: Partial<User>): User {
    return { ...current, ...changes };
}
const u1: User = { id: 1, fullName: "Abebe", email: "a@gmail.com", age: 21 };
const updated = updateUser(u1, { age: 22 }); // only update age
console.log(updated); // { id: 1, fullName: "Abebe", email: "a@gmail.com", age: 22 }

// ── Required<T>: makes all properties required (opposite of Partial)
type OptionalUser = { id?: number; fullName?: string };
type FullUser = Required<OptionalUser>;
// same as: { id: number; fullName: string }

// ── Readonly<T>: makes all properties readonly
type ReadonlyUser = Readonly<User>;
const frozenUser: ReadonlyUser = { id: 1, fullName: "Hana", email: "h@gmail.com", age: 20 };
// frozenUser.age = 21; // Error: cannot assign to 'age' because it is read-only

// ── Pick<T, Keys>: pick only specific properties
type UserPreview = Pick<User, "id" | "fullName">;
// same as: { id: number; fullName: string }

const preview: UserPreview = { id: 1, fullName: "Abebe" };
console.log(preview); // { id: 1, fullName: "Abebe" }

// ── Omit<T, Keys>: remove specific properties
type UserWithoutEmail = Omit<User, "email">;
// same as: { id: number; fullName: string; age: number }

const noEmail: UserWithoutEmail = { id: 2, fullName: "Dani", age: 25 };
console.log(noEmail);

// ── Record<K, V>: create an object type with specific keys and value type
type Role = "admin" | "editor" | "viewer";
type Permissions = Record<Role, boolean>;

const access: Permissions = {
    admin: true,
    editor: true,
    viewer: false,
};
console.log(access.admin); // true

// Record with string keys
type ScoreMap = Record<string, number>;
const scores: ScoreMap = { Abebe: 90, Hana: 85, Dani: 78 };
console.log(scores["Hana"]); // 85

// ── Exclude<T, U>: remove types from a union
type AllRoles = "admin" | "editor" | "viewer" | "guest";
type NoGuest = Exclude<AllRoles, "guest">;
// same as: "admin" | "editor" | "viewer"

let role: NoGuest = "admin"; // valid
// let role2: NoGuest = "guest"; // Error

// ── Extract<T, U>: keep only types that exist in both
type CommonRoles = Extract<AllRoles, "admin" | "editor">;
// same as: "admin" | "editor"

// ── NonNullable<T>: remove null and undefined from a type
type MaybeName = string | null | undefined;
type DefiniteName = NonNullable<MaybeName>;
// same as: string

// ── ReturnType<T>: get the return type of a function
function getUser() {
    return { id: 1, fullName: "Abebe", age: 21 };
}
type GetUserReturn = ReturnType<typeof getUser>;
// same as: { id: number; fullName: string; age: number }

// ── Parameters<T>: get the parameter types of a function as a tuple
function createUser(fullName: string, age: number): User {
    return { id: Date.now(), fullName, email: "", age };
}
type CreateUserParams = Parameters<typeof createUser>;
// same as: [fullName: string, age: number]

// ── Awaited<T>: unwrap a Promise type
type PromiseString = Promise<string>;
type Resolved = Awaited<PromiseString>;
// same as: string

async function fetchName(): Promise<string> {
    return "Abebe";
}
type FetchResult = Awaited<ReturnType<typeof fetchName>>;
// same as: string

// ── Combining utility types
type CreateUserInput = Omit<User, "id">;      // no id when creating
type UpdateUserInput = Partial<Omit<User, "id">>; // all optional, no id

const newUser: CreateUserInput = { fullName: "Tigist", email: "t@gmail.com", age: 23 };
const userPatch: UpdateUserInput = { age: 24 }; // only update age
console.log(newUser);
console.log(userPatch);
