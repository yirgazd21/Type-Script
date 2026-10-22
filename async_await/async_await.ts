export {};

// -- What is async/await?
// async functions always return a Promise<T>
// await pauses execution until a Promise resolves


type User = {
    id: number;
    fullName: string;
    email: string;
};

type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getUser(): Promise<User> {
    await delay(500);
    return { id: 1, fullName: "Abebe", email: "abebe@gmail.com" };
}

async function getPosts(userId: number): Promise<Post[]> {
    await delay(300);
    return [
        { id: 1, userId, title: "First Post",  body: "Hello from post 1!" },
        { id: 2, userId, title: "Second Post", body: "Hello from post 2!" },
        { id: 3, userId, title: "Third Post",  body: "Hello from post 3!" },
    ];
}

async function main(): Promise<void> {
    try {
        const user = await getUser();
        const posts = await getPosts(user.id);

        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}

main();



// ── Basic async function
async function greet(): Promise<string> {
    return "Hello, Abebe!"; // automatically wrapped in Promise<string>
}

greet().then((msg) => console.log(msg)); // "Hello, Abebe!"


async function loadData(): Promise<void> {
    console.log("Loading...");
    await delay(1000); // wait 1 second
    console.log("Data loaded!");
}
loadData();


async function fetchUser(id: number): Promise<User> {
    // Simulating an API response
    await delay(500);
    return { id, fullName: "Hana", email: "hana@gmail.com" };
}

async function showUser(): Promise<void> {
    const user = await fetchUser(1); // TypeScript knows user is User
    console.log(user.fullName);      // "Hana"
    console.log(user.email);         // "hana@gmail.com"
}
showUser();

// ── Error handling with try/catch
async function fetchWithError(id: number): Promise<User> {
    await delay(300);
    if (id <= 0) throw new Error("Invalid ID");
    return { id, fullName: "Abebe", email: "a@gmail.com" };
}

async function safeGetUser(id: number): Promise<void> {
    try {
        const user = await fetchWithError(id);
        console.log(`Found: ${user.fullName}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

safeGetUser(1);  // "Found: Abebe"
safeGetUser(-1); // "Error: Invalid ID"

// ── Promise.all — run multiple async calls at the same time
async function fetchMultiple(): Promise<void> {
    const [user1, user2] = await Promise.all([
        fetchUser(1),
        fetchUser(2),
    ]);
    console.log(user1.fullName); // "Hana"
    console.log(user2.fullName); // "Hana"
}
fetchMultiple();



// ── Promise.race — first one to resolve/reject wins
async function raceDemo(): Promise<void> {
    const first = await Promise.race([
        delay(300).then(() => "slow"),
        delay(100).then(() => "fast"),
    ]);
    console.log(first); // "fast"
}
raceDemo();

// ── Async class method
class ApiService {
    async getUser(id: number): Promise<User> {
        await delay(200);
        return { id, fullName: "Tigist", email: "t@gmail.com" };
    }

    async createUser(fullName: string, email: string): Promise<User> {
        await delay(200);
        const newUser: User = { id: Date.now(), fullName, email };
        console.log(`Created: ${newUser.fullName}`);
        return newUser;
    }
}

const api = new ApiService();
api.getUser(5).then((u) => console.log(u.fullName)); // "Tigist"
api.createUser("Dawit", "d@gmail.com");              // "Created: Dawit"

// ── Typing a function that returns Promise
type FetchFn<T> = (id: number) => Promise<T>;

const loadUser: FetchFn<User> = async (id) => {
    await delay(100);
    return { id, fullName: "Abel", email: "abel@gmail.com" };
};
loadUser(10).then((u) => console.log(u.fullName)); // "Abel"
