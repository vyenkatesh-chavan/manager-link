import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import User from "./model/user.model.js";
import Data from "./model/data.model.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//console.log("MONGO_URI =", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const SECRET = process.env.JWT_SECRET;

/* ---------------- Authentication Middleware ---------------- */

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Please Login",
      });
    }

    const decoded = jwt.verify(token, SECRET);

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

/* ---------------- Register ---------------- */

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    const exist = await User.findOne({ email });

    if (exist)
      return res.status(400).json({
        message: "Email already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "User Registered",
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Login ---------------- */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({
        message: "Wrong Password",
      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      message: "Login Successful",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Logout ---------------- */

app.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "Logout Successful",
  });
});

/* ---------------- Create Category ---------------- */

app.post("/category", auth, async (req, res) => {
  try {
    const { categoryName } = req.body;

    const category = await Data.create({
      userId: req.userId,
      categoryName,
      links: [],
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Get All Categories ---------------- */

app.get("/category", auth, async (req, res) => {
  try {
    const categories = await Data.find({
      userId: req.userId,
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Get One Category ---------------- */

app.get("/category/:id", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Add Link ---------------- */

app.post("/category/:id/link", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });

    category.links.push(req.body);

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Update Link ---------------- */

app.put("/category/:categoryId/link/:linkId", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.categoryId,
      userId: req.userId,
    });

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });

    const link = category.links.id(req.params.linkId);

    if (!link)
      return res.status(404).json({
        message: "Link not found",
      });

    Object.assign(link, req.body);

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Delete Link ---------------- */

app.delete("/category/:categoryId/link/:linkId", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.categoryId,
      userId: req.userId,
    });

    if (!category)
      return res.status(404).json({
        message: "Category not found",
      });

    category.links.pull(req.params.linkId);

    await category.save();

    res.json({
      message: "Link Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Delete Category ---------------- */

app.delete("/category/:id", auth, async (req, res) => {
  try {
    await Data.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({
      message: "Category Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Server ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});