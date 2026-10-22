// user.ts — a module with a default export + named exports

// -- Named type export
export type User = {
    id: number;
    fullName: string;
    email: string;
    role: "admin" | "user";
};

// -- Named function exports
export function createUser(fullName: string, email: string): User {
    return { id: Date.now(), fullName, email, role: "user" };
}

export function isAdmin(user: User): boolean {
    return user.role === "admin";
}

// -- Default export: one main thing exported from this file
export default class UserService {
    private users: User[] = [];

    add(user: User): void {
        this.users.push(user);
    }

    getAll(): User[] {
        return this.users;
    }

    findById(id: number): User | undefined {
        return this.users.find((u) => u.id === id);
    }
}
