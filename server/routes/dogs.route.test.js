const request = require("supertest");
const app = require("../app");
const dbHandler = require("../config/dbHandler");
const Dog = require("../models/dog.model");

describe("Users", () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());
  beforeEach(async () => {
    const dogs = [
      {
        name: "Bernie",
        gender: "male",
        description: "chonko",
        hdbApproved: true,
        available: true,
      },
      {
        name: "Spangle",
        gender: "female",
        description: "spongo",
        hdbApproved: true,
        available: true,
      },
    ];

    await Dog.create(dogs);
  });

  describe("GET /", () => {
    it("should retrieve all dogs in the system", async () => {
      const response = await request(app).get("/dogs");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });
});
