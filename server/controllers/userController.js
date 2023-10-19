import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegisterUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      password: hashPassword,
    });
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      const error = new Error("A user has registered with this email");
      error.statusCode = 400;
      throw error;
    }

    await user.save();
    res.status(201).json({ message: "Registration was successful" });
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const handleGoogleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        fullname:
          req.body.fullname.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You can only update your own account!");
      error.statusCode = 401;
      throw error;
    }

    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You can only delete your own account!");
      error.statusCode = 401;
      throw error;
    }
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (err) {
    next(err);
  }
};
