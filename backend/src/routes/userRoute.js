import express from "express";
import { handleResError } from "../utils/ResError.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const { firstName, lastName, password, email } = req.body;
    if (!firstName || !lastName || !password || !email)
      return handleResError(res, 400, "All fields are required");
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "Email already in use" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { firstName, lastName, password: hashedPassword, email };
    const user = await User.create(newUser);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return handleResError(res, 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return handleResError(res, 400, "All fields are required");

    const user = await User.findOne({ email });
    // console.log("this is user", user);

    if (!user) return handleResError(res, 400, "Does not exist");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleResError(res, 400, "wrong password");

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({ message: "Login successfuly", token });
  } catch (error) {
    console.log(error);
    return handleResError(res, 500, error.message);
  }
});

export default router;
