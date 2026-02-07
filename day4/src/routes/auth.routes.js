const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isuserAlreadyExist = await userModel.findOne({ email });
  const isuserNameAlreadyExist = await userModel.findOne({ name });

  if (isuserAlreadyExist || isuserNameAlreadyExist) {
    return res.status(409).json({
      message: "user already exist...",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex")
  const user = await userModel.create({
    name,
    email,
    password:hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "user created",
    userDetails: user,
    token,
  });
});
authRouter.post("/protected", async (req, res) => {});
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.send(404).json({
      message: "user not exist....",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex")
  const pass = user.password == hash;
  if (!pass) {
    return res.status(401).json({
      message: "wrong password....",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(200).json({
    message: "user logged in successfully....",
  });
});

module.exports = authRouter;
