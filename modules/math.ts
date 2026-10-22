// math.ts — a module that exports utilities

// -- Named export: export specific values
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

// -- Export a type
export type MathOperation = (a: number, b: number) => number;
