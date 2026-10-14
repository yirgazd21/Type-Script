export {};

// -- Basic class
class Person {
    fullName: string;
    age: number;

    constructor(fullName: string, age: number) {
        this.fullName = fullName;
        this.age = age;
    }

    greet(): void {
        console.log(`Hi, I'm ${this.fullName} and I'm ${this.age} years old.`);
    }
}

const p1 = new Person("Abebe", 21);
p1.greet(); // "Hi, I'm Abebe and I'm 21 years old."

// -- Shorthand constructor (declare + assign in one line)
class Student {
    constructor(
        public fullName: string,
        public age: number,
        public grade: string
    ) {}

    info(): void {
        console.log(`${this.fullName} | Age: ${this.age} | Grade: ${this.grade}`);
    }
}

const s1 = new Student("Hana", 20, "A");
s1.info(); // "Hana | Age: 20 | Grade: A"

// -- Access modifiers: public, private, protected
class BankAccount {
    public owner: string;       // accessible anywhere
    private balance: number;    // only inside this class
    protected bankName: string; // inside this class + subclasses

    constructor(owner: string, balance: number) {
        this.owner = owner;
        this.balance = balance;
        this.bankName = "CBE";
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    getBalance(): number {
        return this.balance; // private accessed via a public method
    }
}

const account = new BankAccount("Abebe", 5000);
account.deposit(1000);
console.log(account.getBalance()); // 6000
// console.log(account.balance);   // Error: 'balance' is private

// -- Readonly property (set once in constructor, never changed)
class Circle {
    readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    area(): number {

        
        return Math.PI * this.radius ** 2;
    }
}

const c1 = new Circle(5);
console.log(c1.area().toFixed(2)); // "78.54"
// c1.radius = 10;                 // Error: readonly

// -- Static (belongs to the class, not instances)
class MathHelper {
    static PI = 3.14159;

    static square(n: number): number {
        return n * n;
    }
}

console.log(MathHelper.PI);          // 3.14159
console.log(MathHelper.square(4));   // 16
// No need to create: new MathHelper()

// -- Getter and Setter
class Temperature {
    private _celsius: number;

    constructor(celsius: number) {
        this._celsius = celsius;
    }

    get fahrenheit(): number {
        return this._celsius * 9 / 5 + 32;
    }

    set celsius(value: number) {
        if (value < -273.15) throw new Error("Below absolute zero!");
        this._celsius = value;
    }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit); // 212
temp.celsius = 0;
console.log(temp.fahrenheit); // 32

// -- Inheritance (extends)
class Animal {
    constructor(public species: string) {}

    sound(): void {
        console.log(`${this.species} makes a sound.`);
    }
}

class Dog extends Animal {
    constructor(public ownerName: string) {
        super("Dog"); // call parent constructor
    }

    sound(): void {            // override parent method
        console.log("Woof!");
    }

    fetch(): void {
        console.log(`${this.ownerName}'s dog is fetching!`);
    }
}

const dog = new Dog("Hana");
dog.sound();   // "Woof!" (overridden)
dog.fetch();   // "Hana's dog is fetching!"
console.log(dog.species); // "Dog" (from parent)

// -- Protected: accessible in subclasses
class Vehicle {
    protected speed: number = 0;

    accelerate(amount: number): void {
        this.speed += amount;
    }
}

class Car extends Vehicle {
    showSpeed(): void {
        console.log(`Speed: ${this.speed} km/h`); // can access protected
    }
}

const car = new Car();
car.accelerate(80);
car.showSpeed(); // "Speed: 80 km/h"
// console.log(car.speed); // Error: 'speed' is protected

// -- Abstract class (cannot be instantiated directly, must be extended)
abstract class Shape {
    abstract area(): number; // subclass MUST implement this

    describe(): void {
        console.log(`This shape has area: ${this.area().toFixed(2)}`);
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }

    area(): number {
        return this.width * this.height;
    }
}

class Triangle extends Shape {
    constructor(private base: number, private heightT: number) {
        super();
    }

    area(): number {
        return 0.5 * this.base * this.heightT;
    }
}

const rect = new Rectangle(10, 5);
rect.describe(); // "This shape has area: 50.00"

const tri = new Triangle(8, 6);
tri.describe(); // "This shape has area: 24.00"

// const shape = new Shape(); // Error: cannot instantiate abstract class

// -- Class implementing an interface
interface Printable {
    print(): void;
}

class Report implements Printable {
    constructor(private title: string) {}

    print(): void {
        console.log(`Report: ${this.title}`);
    }
}

const report = new Report("Monthly Sales");
report.print(); // "Report: Monthly Sales"
