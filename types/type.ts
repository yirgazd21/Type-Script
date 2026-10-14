let student: string="hanna";
let age:number=18;
const passedExam:boolean=true;

//other data types

let value: any=true;
value=23;
value="alex";

let values:unknown="hello"; // can accept any  type like any
if(typeof values==="string"){
    console.log(values.toUpperCase());
}

// arays
let ages:number[]=[23,56,43];
let names:string[]=["alex","abel","dani"];
let scores:Array<number>=[80,90,95];

// tuple: specify type to each
let studentInfo:[string,number]=["abel",20];

// object: related information using properties
let user:{name:string,age:number,email:string}={
    name:"hanna",
    age:21,
    email:"yir@gmail.com"
}


