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
      it("Returns a user object on successful registration", () =>
        request(server)
          .post(`${bU}/register`)
          .send({ username: "david", password: "password" })
          .expect(201)
          .then(res => expect(res.body.username).toBe("david")));
      it("Returns an error when attempting to register a duplicate user", () =>
        request(server)
          .post(`${bU}/register`)
          .send({ username: "david", password: "password" })
          .expect(400)
          .then(res => expect(res.body.message).toContain("david")));
    });
    describe("POST /login", () => {
      it("Returns an error for a bad user object", () =>
        request(server)
          .post(`${bU}/login`)
          .expect("Content-Type", /json/)
          .expect(400)
          .then(res => expect(res.body.message).toContain("username")));
      it("Returns a cookie on successful login", () =>
        request(server)
          .post(`${bU}/login`)
          .send({ username: "david", password: "password" })
          .expect(200)
          .then(({ headers }) => {
            cookie = headers["set-cookie"].toString().split(";")[0];
            expect(cookie).toContain("sprint-challenge-authentication-session");
          }));
      it("Returns an error when attempting to login with a nonexistent user", () =>
        request(server)
          .post(`${bU}/login`)
          .send({ username: "david_nonexistent", password: "password" })
          .expect(404)
          .then(res =>
            expect(res.body.message).toContain("david_nonexistent")
          ));
    });
  });
  describe("jokes-router", () => {
    
  });
});
