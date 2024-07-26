const MasterData = require("../model/masterData-modal");
const { response } = require("express");

const getAllMasterData = async (req, res) => {
  try {
    const allMasterData = await MasterData.find({});
    res.status(200).send(allMasterData);
  } catch (error) {
    const err = {
      status: 400,
      message: error,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

const getMasterDataByKey = async (req, res) => {
  console.log(req.query, "req.query", req.params);
  const { key } = req.params;
  const { parentCode } = req.query;
  try {
    const query = {};
    if (key) {
      query.key = key;
    }
    if (parentCode) {
      query.parentCode = parentCode;
    }
    const allMasterData = await MasterData.find(query);
    res.status(200).send(allMasterData);
  } catch (error) {
    const err = {
      status: 400,
      message: error,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

module.exports = {
  getAllMasterData,
  getMasterDataByKey,
};
