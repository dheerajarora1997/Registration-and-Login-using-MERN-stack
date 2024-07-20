require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./Router/auth-router");
const connectDB = require("./utils/db");

app.use(express.json());
app.use("/api", router);

// This is base url return
app.get("/", (req, res) => {
  res.status(200).send("Welcome MERN ServerJS");
});

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running ${PORT}`);
  });
});
