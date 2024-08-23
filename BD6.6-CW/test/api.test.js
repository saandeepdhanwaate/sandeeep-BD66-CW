const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const { getEmployees } = require("../controllers/index.controller");
const { describe, beforeEach } = require("node:test");

jest.mock("../controllers/index.controller", () => ({
  ...jest.requireActual("../controllers/index.controller"),
  getEmployees: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("test API endpoint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return all employees", async () => {
    // Exercise 3: Test Retrieve All Employees
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
    const response = await request(server).get("/employees");
    expect(response.status).toBe(200);
    expect(response.body.employees).toEqual(mockEmp);
  });

  // Exercise 4: Test Retrieve Employee by ID
  it("should return employee by id", async () => {
    let mockEmp = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
    ];

    getEmployees.mockReturnValue(mockEmp);
    const response = await request(server).get("/employees/details/1");
    expect(response.status).toBe(200);
    expect(response.body.employee).toEqual(mockEmp);
  });
});

describe("controll function", () => {
  // Exercise 5: Mock the Get All Employees Function
  it("should return correct list of employees data", () => {
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
    expect(getEmployees()).toEqual(mockEmp);
  });
});
