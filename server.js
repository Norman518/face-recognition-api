const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "12",
      name: "peter",
      email: "aau@gmail.com",
      passowrd: "dada",
      entries: 0,
      joined: new Date()
    },
    {
      id: "123",
      name: "pearfa-teadr",
      email: "aadau@gmail.com",
      passowrd: "dararada",
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
    ? res.json("success")
    : res.status(400).json("fail");
  res.json("signin");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    passowrd: password,
    entries: 0,
    joined: new Date()
  });
  res.json("User has been registered");
});

app.listen(3000, () => {
  console.log("server running");
});
