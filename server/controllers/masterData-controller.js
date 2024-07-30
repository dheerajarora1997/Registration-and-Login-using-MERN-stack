const MasterData = require("../model/masterData-modal");
const { response } = require("express");

const getAllMasterData = async (req, res) => {
  try {
    console.log(req.query, "req.query");
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
  const { search, limit = 10, offset = 0, sort = "_id" } = req.query;
  console.log(req.query, "req.query");
  try {
    const query = { ...req.query };
    delete query.offset;
    delete query.limit;
    delete query.sort;
    if (key) {
      query.key = key;
    }
    if (search) {
      query.value = { $regex: search, $options: "i" };
      delete query.search;
    }
    if (limit) {
    }
    console.log(query, "query");
    const resultMasterData = await MasterData.find(query)
      .limit(limit || 10)
      .skip(offset || 0)
      .sort({ [sort]: -1 });
    res.status(200).send(resultMasterData);
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

const patchMasterData = async (req, res) => {
  const { id } = req.params;
  const { key, value, description, valueType, shortCode, parentCode } =
    req.body;

  try {
    const updatedData = await MasterData.findOneAndUpdate(
      { id },
      { key, value, description, valueType, shortCode, parentCode },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        msg: "Data not found!",
      });
    }

    res.status(200).json({
      msg: "Data updated successfully!",
      updatedData,
    });
  } catch (error) {
    const err = {
      status: 400,
      msg: error.message,
      extraMessage: `Backend Issue patchMasterData!`,
    };
    next(err);
  }
};

module.exports = {
  getAllMasterData,
  getMasterDataByKey,
  postMasterData,
  patchMasterData,
};
