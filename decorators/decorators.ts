export {};

// -- What are Decorators?
// Special functions that attach to classes, methods, properties, or parameters
// They run at class definition time (not when instance is created)
// Enable with: "experimentalDecorators": true in tsconfig.json

// ── Class Decorator — runs when the class is defined
function Sealed(constructor: Function) {
    Object.seal(constructor);              // prevent adding new properties to class
    Object.seal(constructor.prototype);
    console.log(`${constructor.name} class is sealed.`);
}

@Sealed
class Config {
    apiUrl: string = "https://api.example.com";
    timeout: number = 3000;
}
// "Config class is sealed."

// ── Class Decorator Factory — decorator that accepts arguments
function Logger(prefix: string) {
    return function (constructor: Function) {
        console.log(`[${prefix}] ${constructor.name} class was created.`);
    };
}

@Logger("INFO")
class UserService {
    fullName: string = "Abebe";
}
// "[INFO] UserService class was created."

// ── Method Decorator — runs on a class method
function LogCall(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${methodName} with`, args);
        const result = original.apply(this, args);
        console.log(`${methodName} returned`, result);
        return result;
    };
}

class Calculator {
    @LogCall
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(3, 7);
// "Calling add with [3, 7]"
// "add returned 10"

// ── Method Decorator for read-only (prevent overriding)
function ReadOnly(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    descriptor.writable = false; // can't be overridden
    return descriptor;
}

class Greeter {
    @ReadOnly
    greet(): string {
        return "Hello!";
    }
}

const g = new Greeter();
console.log(g.greet()); // "Hello!"
// g.greet = () => "Hi"; // Error at runtime: cannot assign to read-only method

// ── Property Decorator — runs on a class property
function DefaultValue(value: any) {
    return function (target: any, propertyKey: string) {
        target[propertyKey] = value;
        console.log(`Property "${propertyKey}" default set to: ${value}`);
    };
}

class AppSettings {
    @DefaultValue("dark")
    theme!: string;

    @DefaultValue(3000)
    timeout!: number;
}
// "Property "theme" default set to: dark"
// "Property "timeout" default set to: 3000"

// ── Parameter Decorator — marks a specific parameter
function Required(target: any, methodName: string, paramIndex: number) {
    console.log(`Parameter ${paramIndex} of "${methodName}" is required.`);
}

class AuthService {
    login(@Required email: string, password: string): void {
        console.log(`Logging in: ${email}`);
    }
}
// "Parameter 0 of "login" is required."

const auth = new AuthService();
auth.login("abebe@gmail.com", "secret"); // "Logging in: abebe@gmail.com"

// ── Multiple decorators (applied bottom to top)
function First() {
    return function (constructor: Function) {
        console.log("First decorator");
    };
}

function Second() {
    return function (constructor: Function) {
        console.log("Second decorator");
    };
}

@First()
@Second()
class MultiDecorated {}
// "Second decorator"  ← applied first (closest to class)
// "First decorator"   ← applied second (outermost)
