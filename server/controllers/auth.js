import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User created successfully");
    } catch (err) {
      next(createError(500, "Internal Server Error"));
    }
  };
  

export const signin = async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
  
      if (!user) {
        return next(createError(404, "User not found!!"));
      }
  
      if (!user.password) {
        return next(createError(500, "Stored password is undefined"));
      }
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) {
        return next(createError(400, "Wrong credentials!!"));
      }
  
      res.status(200).send("Signin successful");
    } catch (err) {
      console.error(err);
      next(createError(500, "Internal Server Error"));
    }
  };
  
