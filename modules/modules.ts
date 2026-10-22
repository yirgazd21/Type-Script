// modules.ts — main file that imports from other modules

// ── Named imports
import { PI, add, subtract, multiply } from "./math";
import type { MathOperation } from "./math"; // import type only (erased at runtime)

console.log(PI);             // 3.14159
console.log(add(10, 5));     // 15
console.log(subtract(10, 5));// 5
console.log(multiply(3, 4)); // 12

// Use the imported type
const divide: MathOperation = (a, b) => a / b;
console.log(divide(20, 4));  // 5

// ── Rename on import (alias)
import { add as sum, multiply as product } from "./math";
console.log(sum(2, 3));      // 5
console.log(product(2, 3));  // 6

// ── Default import + named imports together
import UserService, { createUser, isAdmin } from "./user";
import type { User } from "./user";

const service = new UserService();

const u1: User = createUser("Abebe", "abebe@gmail.com");
const u2: User = { id: 2, fullName: "Hana", email: "hana@gmail.com", role: "admin" };

service.add(u1);
service.add(u2);

console.log(service.getAll());
// [{ id: ..., fullName: "Abebe", ... }, { id: 2, fullName: "Hana", ... }]

console.log(isAdmin(u1)); // false
console.log(isAdmin(u2)); // true

// ── Namespace import (import everything as one object)
import * as Math from "./math";
console.log(Math.PI);           // 3.14159
console.log(Math.add(100, 50)); // 150

// ── Re-exporting from another file
// You can re-export from a module to create a single entry point (barrel file)
// Example: index.ts would contain:
// export { add, subtract, multiply, PI } from "./math";
// export { createUser, isAdmin } from "./user";
// export { default as UserService } from "./user";
// Then other files only import from "./index"
