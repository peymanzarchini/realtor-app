import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegisterUser = async (req, res, next) => {
  try {
    const { fullname, email, password, avatar } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      password: hashPassword,
      avatar,
    });
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      const error = new Error("A user has registered with this email");
      error.statusCode = 400;
      throw error;
    }

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const handleLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Wrong credentials!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
