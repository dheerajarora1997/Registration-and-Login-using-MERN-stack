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
  const { key } = req.params;
  try {
    const allMasterData = await MasterData.find({ key: key });
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

const getMasterDataByParent = async (req, res) => {
  const { value } = req.query;
  try {
    const allMasterData = await MasterData.find({ parentCode: value });
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
  getMasterDataByParent,
};
