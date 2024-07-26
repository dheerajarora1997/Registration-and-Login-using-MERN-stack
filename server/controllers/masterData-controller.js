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
      extraMessage: "Backend issue getAllMasterData!",
    };
    next(err);
  }
};

const getMasterDataByKey = async (req, res) => {
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
      extraMessage: "Backend issue getMasterDataByKey!",
    };
    next(err);
  }
};

const postMasterData = async (req, res) => {
  const { key, value, description, valueType, shortCode, parentCode } =
    req.body;
  try {
    const TotalRecords = await MasterData.find({});
    const masterCreate = MasterData.create({
      key,
      value,
      description,
      valueType,
      shortCode,
      parentCode,
      id: `M${TotalRecords.length + 1}`,
    });
    res.status(201).json({
      msg: "Data added successfully!",
      id: masterCreate.id,
    });
  } catch (error) {
    const err = {
      status: 400,
      msg: error,
      extraMessage: `Backend Issue postMasterData !`,
    };
    next(err);
  }
};

module.exports = {
  getAllMasterData,
  getMasterDataByKey,
  postMasterData,
};
