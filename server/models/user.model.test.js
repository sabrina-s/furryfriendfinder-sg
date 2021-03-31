require("../app");
const dbHandler = require("../config/dbHandler");
const User = require("../models/user.model");

describe("User model", () => {
  beforeAll(async () => await dbHandler.connect());
  afterEach(async () => await dbHandler.clearDatabase());
  afterAll(async () => await dbHandler.closeDatabase());
  beforeEach(async () => {
    const users = [{ username: "username", password: "password" }];

    await User.create(users);
  });

  describe("validate uniqueness", () => {
    it("should not allow more than 1 user with the same username", async () => {
      let error = null;

      try {
        const user = new User({ username: "username", password: "password" });
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).not.toBeNull();
    });

    it("should allow creation of user with unique username", async () => {
      let error = null;

      try {
        const user = new User({ username: "username2", password: "password" });
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeNull();
    });
  });
});
