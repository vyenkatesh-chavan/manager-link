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

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://manager-link-flax.vercel.app",
  "https://manager-link-wbew.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
app.get("/test", (req, res) => {
  res.json({
    message: "Backend Updated Successfully"
  });
});

/* ---------------- Register ---------------- */

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "User Registered",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Login ---------------- */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

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
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login Successful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Logout ---------------- */

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    message: "Logout Successful",
  });
});
/* ---------------- Create Category ---------------- */

app.post("/category", auth, async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const category = await Data.create({
      userId: req.userId,
      categoryName,
      links: [],
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Get One Category ---------------- */

app.get("/category/:id", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Add Link ---------------- */

app.post("/category/:id/link", auth, async (req, res) => {
  try {
    const { title, url, username, password, notes } = req.body;

    const category = await Data.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.links.push({
      title,
      url,
      username,
      password,
      notes,
    });

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Update Link ---------------- */

app.put("/category/:categoryId/link/:linkId", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.categoryId,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const link = category.links.id(req.params.linkId);

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    link.title = req.body.title ?? link.title;
    link.url = req.body.url ?? link.url;
    link.username = req.body.username ?? link.username;
    link.password = req.body.password ?? link.password;
    link.notes = req.body.notes ?? link.notes;

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Delete Link ---------------- */

app.delete("/category/:categoryId/link/:linkId", auth, async (req, res) => {
  try {
    const category = await Data.findOne({
      _id: req.params.categoryId,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.links.pull(req.params.linkId);

    await category.save();

    res.json({
      message: "Link Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------------- Delete Category ---------------- */

app.delete("/category/:id", auth, async (req, res) => {
  try {
    const category = await Data.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ---------- KEEP ALL YOUR CATEGORY ROUTES UNCHANGED ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
