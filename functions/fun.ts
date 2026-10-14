function sayHello() {
    console.log("Hello!");
}

sayHello();

function greet(name: string) {
    console.log("Hello, " + name);
}

greet("Abebe");
greet("Hana");

// fun with return type
function add(a: number, b: number): number {
    return a + b;
}

let results = add(10, 20);

console.log(results);

// optional parameter
function greetUser(name: string, age?: number): void {
    console.log("Hello, " + name);

    if (age !== undefined) {
        console.log("Age: " + age);
    }
}

greetUser("Abebe");
greetUser("Hana", 21);

// dfault param
function welcome(name: string = "Guest"): void {
    console.log("Welcome, " + name);
}

welcome();
welcome("Abebe");

// arrow function
const multiply = (a: number, b: number): number => {
    return a * b;
};
multiply(45, 67);

// calculate total
const calculateTotal = (price: number, quantity: number): number => {
    return price * quantity;
};
let total = calculateTotal(2000, 5);
console.log(`total of productis : ${total}`);

// function as type
let mathOperation: (a: number, b: number) => number = add;
console.log(mathOperation(10, 20));


// function that retun function
