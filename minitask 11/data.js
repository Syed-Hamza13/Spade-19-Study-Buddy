studentDB;

db.students.insertMany([
  { name: "Anuj",  age: 20, course: "AI",  createdAt: new Date() },
  { name: "hamza",   age: 19, course: "CY",createdAt: new Date() },
  { name: "vivek",  age: 21, course: "CSE", createdAt: new Date() }
]);

db.students.find();
