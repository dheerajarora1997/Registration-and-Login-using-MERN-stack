const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { loginSchema, registerSchema } = require("../validator/auth-validator");
const validate = require("../middlewares/validate-middleware");

// Mount Router
// router.get("/", (req, res) => {
//   res.status(200).send("Welcome MERN AUTH");
// });

// Mount multiple routers
// router.route("/").get((req, res) => {
//   res.status(200).send("Welcome MERN AUTH");
// });
router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(registerSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

module.exports = router;
