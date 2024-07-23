require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json());
app.use("/api", router);

// This is base url return
app.get("/", (req, res) => {
  res.status(200).send("Welcome MERN ServerJS");
});

app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running ${PORT}`);
  });
});
