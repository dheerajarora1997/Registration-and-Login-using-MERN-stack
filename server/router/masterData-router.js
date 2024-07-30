const express = require("express");
const router = express.Router();
const MasterDataControllers = require("../controllers/masterData-controller");

router.route("/").get(MasterDataControllers.getAllMasterData);
router.route("/:key").get(MasterDataControllers.getMasterDataByKey);
router.route("/").post(MasterDataControllers.postMasterData);
router.route("/:id").patch(MasterDataControllers.patchMasterData);

module.exports = router;
