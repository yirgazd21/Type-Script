export {}; // module scope

// -- Basic generic function
// T is a type placeholder — it gets replaced by the actual type when called
function identity<T>(value: T): T {
    return value;
}
console.log(identity<string>("Abebe")); // "Abebe"
console.log(identity<number>(42));      // 42
console.log(identity<boolean>(true));   // true

// -- TypeScript can infer T automatically
console.log(identity("Hana"));  // infers T = string

// -- Generic function with array
function firstItem<T>(arr: T[]): T {
    return arr[0];
}
console.log(firstItem([10, 20, 30]));        // 10
console.log(firstItem(["a", "b", "c"]));     // "a"

// -- Generic with multiple type parameters
function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
}
console.log(pair("id", 101));         // ["id", 101]
console.log(pair(true, "active"));    // [true, "active"]

// -- Generic interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

const userResponse: ApiResponse<{ fullName: string; age: number }> = {
    data: { fullName: "Abebe", age: 21 },
    status: 200,
    message: "OK",
};
console.log(userResponse.data.fullName); // "Abebe"

const scoreResponse: ApiResponse<number[]> = {
    data: [90, 85, 78],
    status: 200,
    message: "OK",
};
console.log(scoreResponse.data); // [90, 85, 78]

// -- Generic type alias
type Wrapper<T> = {
    value: T;
    label: string;
};

const wrapped: Wrapper<number> = { value: 100, label: "score" };
console.log(wrapped); // { value: 100, label: "score" }

// -- Generic class
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const numStack = new Stack<number>();
numStack.push(10);
numStack.push(20);
numStack.push(30);
console.log(numStack.peek()); // 30
console.log(numStack.pop());  // 30
console.log(numStack.pop());  // 20

const strStack = new Stack<string>();
strStack.push("first");
strStack.push("second");
console.log(strStack.pop()); // "second"

// -- Generic constraint (T must have a .length property)
function printLength<T extends { length: number }>(value: T): void {
    console.log(value.length);
}
printLength("Hello");          // 5
printLength([1, 2, 3]);        // 3
// printLength(42);             // Error: number has no 'length'

// -- keyof constraint (T must be a key of object U)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const student = { fullName: "Hana", age: 20, grade: "A" };
console.log(getProperty(student, "fullName")); // "Hana"
console.log(getProperty(student, "age"));      // 20
// getProperty(student, "score");               // Error: not a key of student

// -- Default generic type
interface Box<T = string> {
    content: T;
}

const box1: Box = { content: "default is string" }; // T defaults to string
const box2: Box<number> = { content: 42 };
console.log(box1.content); // "default is string"
console.log(box2.content); // 42
