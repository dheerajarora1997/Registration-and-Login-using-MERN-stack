const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");

router.route("/contact").post(authControllers.contact);

module.exports = router;
