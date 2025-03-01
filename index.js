const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;

// assuming this is a database
let employees = [
  { id: 1, name: "John Doe", role: "Software Engineer" },
  { id: 2, name: "Jane Doe", role: "Project Manager" },
];

app.get("/", (req, res) => {
  res.send("This is an employee management system");
});

// To view all employee info
app.get("/employees", (req, res) => {
  res.render("employees", { employees });
});

// To view individual employee info
app.get("/employees/:id", (req, res) => {
  const employee = employees.find((emp) => emp.id == req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// To create a new employee
app.post("/employees", (req, res) => {
  const { name, role } = req.body;
  const newEmployee = { id: employees.length + 1, name, role };
  employees.push(newEmployee);
  res.redirect("/employees");
});

// To update a new employee
app.post("/employees/:id/update", (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const employee = employees.find((emp) => emp.id == id);

  if (employee) {
    employee.name = name || employee.name;
    employee.role = role || employee.role;
    res.redirect("/employees");
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

// To delete a new employee
app.post("/employees/:id/delete", (req, res) => {
  employees = employees.filter((emp) => emp.id != req.params.id);
  res.redirect("/employees");
});

app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
});
