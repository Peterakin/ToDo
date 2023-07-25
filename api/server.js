const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(cors());

const MONGODB_URL = 'mongodb+srv://peterakinlosotu:PE2003ter@cluster0.jkzdnan.mongodb.net/todos?retryWrites=true&w=majority'
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });

const User = require("./models/User");

app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });

    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email error
      res.status(409).json({ error: "Email already registered" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    });

    if (!foundUser) {
      return res.json({ status: "error", error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
        },
        "secret123"
      );

      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", error: "Invalid login" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const Todo = require("./models/Todo");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

app.post("/todo/new", async (req, res, next) => {
  try {
    const { text, token } = req.body;
    const decoded = jwt.verify(token, "secret123");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" }); // Error message if user is not found
    }

    const todo = new Todo({
      text,
      user: user._id,
    });

    const savedTodo = await todo.save();
    user.todo = user.todo.concat(savedTodo._id);
    await user.save();

    res.json(savedTodo);
  } catch (error) {
    next(error);
  }
});

app.get("/todo/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await user.findById(id);

  res.json(user);
});

app.delete("/todo/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
});

app.get("/todo/complete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    todo.complete = !todo.complete;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

app.listen(1602, () => console.log("Server started on port 1602"));