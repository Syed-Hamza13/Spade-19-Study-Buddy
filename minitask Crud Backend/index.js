const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());


let students = [
  { id: 1, name: "HamA", age: 21 },
  { id: 2, name: "Ali", age: 22 },
];

app.get("/", (req, res) => {
  res.send("Welcome to Student API 🚀 Use /students to get data");
});

app.get("/students", (req, res) => {
  res.json(students);
});


app.post("/students", (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const index = students.findIndex(s => s.id == id);

  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});


app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  students = students.filter(s => s.id != id);
  res.json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
