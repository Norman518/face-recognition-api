const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "cakemuffin",
    database: "face-recognition-db"
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: "12",
      name: "peter",
      email: "a@gmail.com",
      password: "a",
      entries: 0,
      joined: new Date()
    },
    {
      id: "123",
      name: "pearfa-teadr",
      email: "awe@gmail.com",
      password: "awe",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password
    ? res.json(database.users[0])
    : res.status(400).json("fail");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  postgres
    .transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
            .returning("*")
            .insert({ email: loginEmail[0], name: name, joined: new Date() })
            .then(user => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })

    .catch(err => res.status(400).json("Unable to register!"));
});
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  postgres("users")
    .select("*")
    .from("users")
    .where({ id })
    .then(user => {
      user.length > 0
        ? res.json(user[0])
        : res.status(400).json("User not found");
    })
    .catch(err => res.status(400).json("User not found"));
});
app.put("/image", (req, res) => {
  const { id } = req.body;

  postgres("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries =>
      entries.length > 0
        ? res.json(entries[0])
        : res.status(400).json("Unable to get entries!")
    )
    .catch(err => res.status(400).json("Unable to get entries!"));
});
app.listen(3000, () => {
  console.log("server running");
});
