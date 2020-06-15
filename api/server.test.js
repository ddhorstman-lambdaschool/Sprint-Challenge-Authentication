const request = require("supertest");
const server = require("./server");
const knex = require("../database/dbConfig");

describe("server", () => {
  //IMPORTANT!
  //This cookie will be set while testing /auth/login
  //and then sent while testing /jokes
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
    const bU = "/api/jokes";
    it("Returns an error to users who aren't logged in", () =>
      request(server)
        .get(`${bU}/`)
        .expect(401)
        .then(res => expect(res.body.you).toBe("shall not pass!")));
    it("Returns an array of jokes to logged-in users", () =>
      request(server)
        .get(`${bU}/`)
        .set("Cookie", cookie)
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body));
          expect(body[0].id).toBeDefined();
          expect(body[0].joke).toBeDefined();
        }));
  });
});
