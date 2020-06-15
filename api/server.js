const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const secrets = require('../config/secrets');

const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const sessionDuration = 1000 * 60 * 60 * 24;

const sessionConfig = {
  name: "node-auth1-session",
  secret: secrets.SESSION_SECRET,
  cookie: {
    maxAge: sessionDuration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("../database/dbConfig"),
    tableName: "session",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: sessionDuration,
  }),
};

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const { custom404, errorHandling } = require("../config/errors");


const server = express();

server.use(helmet());
server.use(cors({ origin: true, credentials: true}));
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.all("*", custom404);
server.use(errorHandling);

module.exports = server;
