const request = require("supertest");
const app = require("../app");
const dbHandler = require("../config/dbHandler");
const User = require("../models/user.model");

describe("Users", () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());
  beforeEach(async () => {
    const users = [{ username: "username", password: "password" }];

    await User.create(users);
  });

  describe("POST /register", () => {
    it("should create a new User if fields are valid", async () => {
      const validUser = {
        username: "validusername",
        password: "validpassword",
      };

      const response = await request(app)
        .post("/users/register")
        .send(validUser);

      expect(response.status).toBe(201);
    });

    it("should throw error if fields are invalid", async () => {
      const invalidUser = {
        username: "u",
        password: "p",
      };

      const response = await request(app)
        .post("/users/register")
        .send(invalidUser);

      expect(response.status).toBe(400);
    });
  });

  describe("POST /login", () => {
    it("should log user in and generate valid JWT if fields are valid", async () => {
      const newUser = {
        username: "username2",
        password: "password2",
      };
      const user = new User(newUser);
      await user.save();
      const token = user.generateJWT();

      const response = await request(app).post("/users/login").send(newUser);

      expect(response.status).toBe(200);
      expect(user.verifyJWT(token)).toBeTruthy();
    });

    it("should throw error if user does not exist", async () => {
      const invalidUser = {
        username: "u",
        password: "p",
      };

      const response = await request(app)
        .post("/users/login")
        .send(invalidUser);

      expect(response.status).toBe(422);
    });

    it("should throw error if password is wrong", async () => {
      const invalidPassword = {
        username: "username",
        password: "passw0rd",
      };

      const response = await request(app)
        .post("/users/login")
        .send(invalidPassword);

      expect(response.status).toBe(422);
    });
  });

  describe("POST /users/logout", () => {
    it("should log user out successfully", async () => {
      const response = await request(app).post("/users/logout");

      expect(response.status).toBe(200);
    });
  });

  describe("GET /users/me", () => {
    it("should retrieve currently logged in user via JWT access_token", async () => {
      const newUser = {
        username: "username2",
        password: "password2",
      };
      const user = new User(newUser);
      await user.save();
      const token = user.generateJWT();

      const response = await request(app)
        .get("/users/me")
        .set("Cookie", `access_token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ username: "username2", isAdmin: false });
    });

    it("should throw error if invalid access_token is provided", async () => {
      const invalidToken = 666;

      const response = await request(app)
        .get("/users/me")
        .set("Cookie", `access_token=${invalidToken}`);

      expect(response.status).toBe(500);
    });
  });
});
