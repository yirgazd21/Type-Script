export {}; // module scope

// -- Basic interface
interface User {
    fullName: string;
    age: number;
    email: string;
}

const user: User = { fullName: "Abebe", age: 21, email: "abebe@gmail.com" };
console.log(user.fullName); // "Abebe"

// -- Optional property
interface Product {
    id: number;
    title: string;
    discount?: number; // may or may not exist
}

const laptop: Product = { id: 1, title: "Laptop", discount: 10 };
const phone: Product = { id: 2, title: "Phone" }; // no discount, still valid

// -- Readonly property
interface Config {
    readonly apiUrl: string;
    timeout: number;
}

const config: Config = { apiUrl: "https://api.example.com", timeout: 3000 };
// config.apiUrl = "other"; // Error: cannot change readonly
config.timeout = 5000; // OK

// -- Method in interface
interface Shape {
    color: string;
    area(): number;
    describe(): string;
}

const circle: Shape = {
    color: "red",
    area() { return Math.PI * 5 * 5; },
    describe() { return `A ${this.color} circle with area ${this.area().toFixed(2)}`; },
};
console.log(circle.describe()); // "A red circle with area 78.54"

// -- Extending interface (inherit from another)
interface Animal {
    species: string;
    sound(): void;
}

interface Pet extends Animal {
    owner: string;
}

const dog: Pet = {
    species: "Dog",
    owner: "Hana",
    sound() { console.log("Woof!"); },
};
dog.sound(); // "Woof!"

// -- Extending multiple interfaces
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

interface Duck extends Flyable, Swimmable {
    quack(): void;
}

const duck: Duck = {
    fly() { console.log("Flying!"); },
    swim() { console.log("Swimming!"); },
    quack() { console.log("Quack!"); },
};
duck.quack(); // "Quack!"

// -- Interface with a class (implements)
interface Vehicle {
    brand: string;
    speed: number;
    move(): void;
}

class Car implements Vehicle {
    brand: string;
    speed: number;

    constructor(brand: string, speed: number) {
        this.brand = brand;
        this.speed = speed;
    }

    move() {
        console.log(`${this.brand} is moving at ${this.speed} km/h`);
    }
}

const myCar = new Car("Toyota", 120);
myCar.move(); // "Toyota is moving at 120 km/h"

// -- Interface for a function type
interface Greet {
    (firstName: string, lastName: string): string;
}

const greet: Greet = (firstName, lastName) => `Hello, ${firstName} ${lastName}!`;
console.log(greet("Abebe", "Kebede")); // "Hello, Abebe Kebede!"

// -- Index signature (dynamic keys)
interface ScoreBoard {
    [studentName: string]: number;
}

const scores: ScoreBoard = {
    Abebe: 90,
    Hana: 85,
    Dani: 78,
};
console.log(scores["Hana"]); // 85

// -- Interface merging (declarations with same name merge automatically)
interface Settings {
    theme: string;
}
interface Settings {
    language: string;
}
// Both merge into one:
const settings: Settings = { theme: "dark", language: "Amharic" };
console.log(settings); // { theme: "dark", language: "Amharic" }
