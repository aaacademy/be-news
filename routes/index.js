const multer = require("multer");
require('dotenv').config()
const nodemailer = require("nodemailer");
const {
  createPost,
  getPosts,
  removePost,
} = require("../controllers/post.controller");
const {
  getUsers,
  createUser,
  removeUser,
  loginUser,
} = require("../controllers/user.controller");
const { checkToken } = require("../middleware/hasLogin.middleware");

const upload = multer({ dest: "uploads/" });

const route = require("express").Router();

route.get("/test-email", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "admin@news.com",
    to: "pigeon.profesionnel@gmail.com",
    subject: "Test Email",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(500).json({
        data: error,
        message: "failed",
      });
    } else {
      res.send(200).json({
        data: "Email sent: " + info.response,
        message: "failed",
      });
    }
  });
});

route.get("/users", getUsers);
route.post("/users", createUser);
route.delete("/users/:id", checkToken, removeUser);
route.post("/login", loginUser);

route.post("/posts", checkToken, createPost);
route.delete("/posts/:id", checkToken, removePost);
route.get("/posts", getPosts);

module.exports = route;
