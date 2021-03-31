const request = require("supertest");
const app = require("../app");
const dbHandler = require("../config/dbHandler");
const Dog = require("../models/dog.model");
const User = require("../models/user.model");

describe("Users", () => {
  let adminToken;
  let userToken;

  beforeAll(async () => {
    await dbHandler.connect();

    const adminUser = new User({
      username: "admin-username",
      password: "password",
      isAdmin: true,
    });
    await adminUser.save();
    adminToken = adminUser.generateJWT();
  });
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
        hdbApproved: false,
        available: true,
      },
    ];

    await Dog.create(dogs);

    const user = new User({
      username: "username",
      password: "password",
      isAdmin: false,
    });
    await user.save();
    userToken = user.generateJWT();
  });

  describe("GET /dogs", () => {
    it("should retrieve all dogs in the system", async () => {
      const response = await request(app).get("/dogs");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe("POST /dogs", () => {
    it("should create new dog if authorised and fields are valid", async () => {
      const dog = {
        name: "dog",
        gender: "female",
        description: "dog",
        hdbApproved: false,
        available: true,
      };

      const response = await request(app)
        .post("/dogs")
        .send(dog)
        .set("Cookie", `access_token=${adminToken}`);

      expect(response.status).toBe(200);
    });

    it("should throw error if unauthorised even if fields are valid", async () => {
      const dog = {
        name: "dog",
        gender: "female",
        description: "dog",
        hdbApproved: false,
        available: true,
      };

      const response = await request(app)
        .post("/dogs")
        .send(dog)
        .set("Cookie", `access_token=${userToken}`);

      expect(response.status).toBe(403);
    });

    it("should throw error if required fields are missing", async () => {
      const dog = { name: "dog" };

      const response = await request(app).post("/dogs").send(dog);

      expect(response.status).toBe(500);
    });
  });

  describe("GET /dogs/:id", () => {
    it("should retrieve dog given valid id", async () => {
      const dog = await Dog.findOne();
      const expectedDog = {
        name: dog.name,
        description: dog.description,
        available: dog.available,
      };

      const response = await request(app).get(`/dogs/${dog._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(expectedDog);
    });
  });

  describe("PUT /dogs/:id", () => {
    it("should update dog attribute if authorised", async () => {
      const body = { available: false };
      const dog = await Dog.findOne();

      const response = await request(app)
        .put(`/dogs/${dog._id}`)
        .send(body)
        .set("Cookie", `access_token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: `${dog.name} updated successfully!`,
      });
    });

    it("should throw error if unauthorised", async () => {
      const body = { available: false };
      const dog = await Dog.findOne();

      const response = await request(app)
        .put(`/dogs/${dog._id}`)
        .send(body)
        .set("Cookie", `access_token=${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("DELETE /dogs/:id", () => {
    it("should update dog attribute if authorised", async () => {
      const dog = await Dog.findOne();

      const response = await request(app)
        .delete(`/dogs/${dog._id}`)
        .set("Cookie", `access_token=${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: `${dog.name} deleted successfully!`,
      });
    });

    it("should throw error if unauthorised", async () => {
      const dog = await Dog.findOne();

      const response = await request(app)
        .delete(`/dogs/${dog._id}`)
        .set("Cookie", `access_token=${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("GET /dogs?name=bernie", () => {
    it("should return dogs with 'bernie' in the name", async () => {
      const query = "bernie";

      const response = await request(app).get(`/dogs?name=${query}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toEqual("Bernie");
    });
  });

  describe("GET /dogs?name=bern", () => {
    it("should return dogs with 'bern' in the name", async () => {
      const query = "bern";

      const response = await request(app).get(`/dogs?name=${query}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toEqual("Bernie");
    });
  });

  describe("GET /dogs?hdbApprovedOnly=true", () => {
    it("should return only HDB-approved dogs", async () => {
      const response = await request(app).get(`/dogs?hdbApprovedOnly=true`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });

  describe("GET /dogs?name=spang&hdbApprovedOnly=false", () => {
    it("should return all matched dogs regardless of HDB approval status", async () => {
      const response = await request(app).get(
        `/dogs?name=spang&hdbApprovedOnly=false`,
      );

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toEqual("Spangle");
    });
  });

  describe("POST /dogs/:id/favourite", () => {
    it("should throw error if no user logged in", async () => {
      const dog = await Dog.findOne();

      const response = await request(app)
        .post(`/dogs/${dog._id}/favourite`)
        .send({});

      expect(response.status).toBe(500);
    });

    it("should add dog into current user's favourites", async () => {
      const dog = await Dog.findOne();

      const response = await request(app)
        .post(`/dogs/${dog._id}/favourite`)
        .send({})
        .set("Cookie", `access_token=${userToken}`);

      const { favourites } = await User.findOne();

      expect(response.status).toBe(200);
      expect(favourites.length).toBe(1);
    });

    it("should not add same dog into current user's favourites twice", async () => {
      const dog = await Dog.findOne();

      const response1 = await request(app)
        .post(`/dogs/${dog._id}/favourite`)
        .send({})
        .set("Cookie", `access_token=${userToken}`);

      const response2 = await request(app)
        .post(`/dogs/${dog._id}/favourite`)
        .send({})
        .set("Cookie", `access_token=${userToken}`);

      const { favourites } = await User.findOne();

      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(favourites.length).toBe(1);
    });
  });
});
