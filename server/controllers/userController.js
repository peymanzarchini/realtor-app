import User from "../models/user.js";
import bcrypt from "bcrypt";

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
