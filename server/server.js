require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const recordRouter = require("./router/record-router");
const contactRouter = require("./router/contact-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json());
app.use("/api", recordRouter);
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);

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
