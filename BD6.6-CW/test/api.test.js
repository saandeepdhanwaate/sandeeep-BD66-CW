const request = require("supertest");
const { app } = require("../index");
const {
  getEmployees,
  getEmployeeById,
} = require("../controllers/index.controller");
const http = require("http");
const { describe } = require("node:test");

jest.mock("../controllers/index.controller", () => ({
  ...jest.requireActual("../controllers/index.controller"),
  getEmployees: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

// api endpoint check

describe("API endpoint test", () => {
  // Exercise 3: Test Retrieve All Employees
  it("should return all employee ", async () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    let res = await request(server).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmployees);
    expect(res.body.employees.length).toBe(3);
  });

  // Exercise 4: Test Retrieve Employee by ID
  it("should return employee by id", async () => {
    let mockEmployee = {
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    };

    let res = await request(server).get("/employees/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmployee);
  });
});

describe("controller functions", () => {
  // Exercise 5: Mock the Get All Employees Function
  it("should return all employees", () => {
    let mockEmp = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getEmployees.mockReturnValue(mockEmp);
    let result = getEmployees();
    expect(result).toBe(mockEmp);
    expect(result.length).toBe(3)
    
  });
});
