const request = require("supertest");
const server = require("./server");
const knex = require("../database/dbConfig");

describe("server", () => {
  let cookie;
  beforeAll(async () => {
    await knex("users").truncate();
  });
  describe("auth-router", () => {
    const bU = "/api/auth";
    describe("POST /register", () => {
      it("Returns an error for a bad user object", () =>
        request(server)
          .post(`${bU}/register`)
          .expect("Content-Type", /json/)
          .expect(400)
          .then(res => expect(res.body.message).toContain("username")));
    });
  });
});
