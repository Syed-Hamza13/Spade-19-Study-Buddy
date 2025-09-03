const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true })) 

// Students ki list memory me store karenge
let students = []

// Root route -> Form with Add + Table
app.get("/", (req, res) => {
  res.send(`
    <h2>Student Form</h2>
    <form method="POST" action="/add">
      Name: <input type="text" name="name" required><br>
      Age: <input type="number" name="age" required><br>
      Roll No: <input type="text" name="roll" required><br><br>
      <button type="submit">Add Student</button>
    </form>
    <h3>Added Students:</h3>
    <table border="1" cellpadding="5">
      <tr><th>Name</th><th>Age</th><th>Roll No</th></tr>
      ${students.map(s => `<tr><td>${s.name}</td><td>${s.age}</td><td>${s.roll}</td></tr>`).join("")}
    </table>
    <br>
    <form method="POST" action="/submit">
      <button type="submit">Submit All</button>
    </form>
  `) 
}) 

// Add Student route
app.post("/add", (req, res) => {
  const { name, age, roll } = req.body 
  students.push({ name, age, roll }) 
  res.redirect("/") // Wapas form pe le jao
}) 

// Submit route
app.post("/submit", (req, res) => {
  res.send("<h2>Details Submitted!</h2><a href='/students-detail'>View Students JSON</a>") 
}) 

app.get("/students-detail", (req, res) => {
  res.json(students) 
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`) 
})
