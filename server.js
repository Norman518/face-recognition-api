const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
      email: "a@gmail.com",
      password: "a",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  console.log(
    req.body.email,
    database.users[0].email,
    req.body.password,
    database.users[0].password
  );
  req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password
    ? res.json("success")
    : res.status(400).json("fail");
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
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("User not found");
  }
});
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("Image not found");
  }
});
app.listen(3000, () => {
  console.log("server running");
});
