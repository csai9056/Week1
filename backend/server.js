const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const { error } = require("console");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "T.saicharan7@",
  database: "form",
});
db.connect((err) => {
  if (err) {
    console.error("error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log("GET request received");
  res.send({
    status: "success",
    message: "API is working",
    data: "Masynctech",
  });
});
app.post("/register", async (req, res) => {
  data = req.body;
  const { name, email, phono, pass } = req.body;
  const hashedPassword = await bcrypt.hash(pass, 5);
  const query =
    "INSERT INTO users (Name, Email, PhoneNumber, Password) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, phono, hashedPassword], (err, result) => {
    if (err) {
      return res({
        status: "error",
      });
    }
    // console.log("Data inserted successfully:", result);
    res.status(200).send({
      status: "success",
      message: "success",
    });
  });
});
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const query = "select * from users where name=?";
  db.query(query, [name], async (err, result) => {
    if (err) {
      res.send({
        message: "error",
      });
      return;
    } else if (result.length == 0) {
      res.send({
        message: "user not found",
      });
      return;
    }
    const user = result[0];
    // console.log(user);
    // console.log(user.Password);
    if (user.Password) {
      // console.log("sai");
      let valid = await bcrypt.compare(password, user.Password);
      if (!valid) {
        res.send({
          message: "wrong password",
        });
      } else if (valid) {
        // console.log("correct");
        res.send({
          message: "login successfull",
        });
      }
    }
  });
});
app.get("/details/:id", async (req, res) => {
  let name = req.params.id;
  console.log(name);
  const query = "select * from users where name=?";
  db.query(query, [name], async (err, result) => {
    if (err) {
      res.send({
        name: name,
        error: err,
      });
    } else {
      res.send({
        data: result,
      });
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
