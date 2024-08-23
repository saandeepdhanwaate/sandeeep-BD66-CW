const express = require("express");
const app = express();
const cors = require("cors");
const {
  getEmployees,
  getEmployeeById,
  
} = require("./controllers/index.controller");

app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Employees 🟢
app.get("/employees", (_, res) => {
  const employees = getEmployees();
  return res.status(200).json({ employees });
});

// Exercise 2: Retrieve Employee by ID  🟢
app.get("/employees/details/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = getEmployeeById(employeeId);

  return res.status(200).json({ employee });
});

module.exports = { app };
