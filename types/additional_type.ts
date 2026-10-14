// create custom types
type Student = {
    name: string,
    age: number
}
let student1: Student = {
    name: "abebe",
    age: 23
}

// interface: describe an object
interface Product {
    name: string,
    price: number
}
let product1: Product = {
    name: "labtop",
    price: 45000
}

// union type:more than one type
let id: number | string;
id = 232576;
id = "abctruj";

// literal type:  specific allowable value
type Direction = "up" | "down" | "left" | "right";
let direction: Direction = "up";

let statuss: "pending" | "approved" | "rejected";
statuss = "approved"; // Valid

// enum:named constants-group named value togather
enum Role {
    admin,
    user,
    gust
}
let myRole: Role = Role.admin;

// never — A value that never occurs
// never is used for functions that never complete normally, such as functions that always throw an error.
function fail(): never {
    throw new Error("Something went wrong");
}


// null and undefined
//These represent missing or absent values.
let selectedName: string | null = null;

let result: undefined = undefined;


// - null often represents an intentionally empty value.
// - undefined often represents a value that hasn't been assigned or is missing.