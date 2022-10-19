const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/hello", (req, res) => {
  res.send("<button>Hello world</button>");
});

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) return res.send("Wrong data");

  res.send("The user: " + req.body.username + " is now logged in.");
});

const users = [
  {
    username: "John",
    password: "password",
  },
  {
    username: "Jane",
    password: "aoihsd87723",
  },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.use((req, res) => {
  res.status(404).sendFile("public/404.html", { root: __dirname });
});
