const express = require("express");
const router = express.Router();
const MasterDataControllers = require("../controllers/masterData-controller");

router.route("/").get(MasterDataControllers.getAllMasterData);
router.route("/:key").get(MasterDataControllers.getMasterDataByKey);
router
  .route("/:key?value=:value")
  .get(MasterDataControllers.getMasterDataByParent);
// router.route("/").post(MasterDataControllers.postAllMasterData);

module.exports = router;
