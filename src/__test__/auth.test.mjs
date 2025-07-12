import request from "supertest";
import app from "../../app.mjs";

const users = [
  {
    username: "testsuperadmin1",
    email: "testsuperadmin1@mail.com",
    password: "password123",
    name: "Super Admin",
    phone: "9999999999",
    dob: new Date("1985-01-01"),
    role: "superadmin",
  },
  {
    username: "testclubadmin1",
    email: "testclubadmin1@mail.com",
    password: "password123",
    name: "Club Admin",
    phone: "8888888888",
    dob: new Date("1987-05-10"),
    role: "clubadmin",
  },
  {
    username: "testuser1",
    email: "testuser1@mail.com",
    password: "password123",
    name: "Regular User",
    phone: "7777777777",
    dob: new Date("1995-07-15"),
    role: "user",
  },
];
let expectedString = "";
describe("Auth API Tests", () => {
  expectedString = "User registered successfully";
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(users[0])
      .expect(201);
    expect(response.body.message).toMatch(expectedString);
  });

  it("should not register duplicate user", async () => {
    expectedString = "Duplicate entry";
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(users[0])
      .expect(400);
    expect(String(response.body.message).toLowerCase()).toMatch(
      /duplicate entry/
    );
  });

  it("should login with correct credentials", async () => {
    expectedString = "Login successful";
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: users[0].username,
        password: users[0].password,
      })
      .expect(200);
    expect(response.body.message.trim().toLowerCase()).toMatch(
      /login successful/
    );
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject login with incorrect password", async () => {
    expectedString = "Invalid password";
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: users[0].username,
        password: "wrongPassword123",
      })
      .expect(401);

    expect(response.body.message.trim().toLowerCase()).toMatch(
      /invalid password/
    );
  });

  it("should reject login with non-existent username", async () => {
    expectedString = "User not found";
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        username: "nonexistent_user",
        password: "password123",
      })
      .expect(404);

    expect(response.body.message.trim().toLowerCase()).toMatch(
      /user not found/
    );
  });
});
