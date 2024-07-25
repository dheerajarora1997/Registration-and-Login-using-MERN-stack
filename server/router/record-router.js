const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");

router.route("/allUsers").get(authControllers.usersGet);
router.route("/contactRecords").get(authControllers.contactRecords);

module.exports = router;
