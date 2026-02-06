const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isuserAlreadyExist = await userModel.findOne({ email });
  const isuserNameAlreadyExist = await userModel.findOne({ name });

  if (isuserAlreadyExist || isuserNameAlreadyExist) {
    return res.status(409).json({
      message: "user already exist...",
    });
  }
  const user = await userModel.create({
    name,
    email,
    password,
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

module.exports = authRouter;
