const MasterData = require("../model/masterData-modal");
const CounterId = require("../model/counter-modal");
const { getNewId } = require("../utils");

const getAllMasterData = async (req, res, next) => {
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

const getMasterDataByKey = async (req, res, next) => {
  const { key } = req.params;
  const { search, limit = 10, offset = 0, sort = "_id" } = req.query;
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

const postMasterData = async (req, res, next) => {
  const { key, value, description, valueType, shortCode, parentCode } =
    req.body;

  try {
    // Fetch the current counter document
    const totalCount = await CounterId.findOne();
    if (!totalCount) {
      throw new Error("CounterId document not found");
    }

    // Generate new masterId
    let newMasterId = await getNewId("masterId", totalCount);

    // Create a new master data document
    const masterCreate = await MasterData.create({
      key,
      value,
      description,
      valueType,
      shortCode,
      parentCode,
      id: newMasterId,
    });

    totalCount.masterId = newMasterId;
    await totalCount.save();

    res.status(201).json({
      msg: `Data added successfully! ${masterCreate.id}`,
      id: masterCreate.id,
    });
  } catch (error) {
    // Handle errors
    const err = {
      status: 400,
      msg: error.message,
      extraMessage: `Backend Issue postMasterData!`,
    };
    next(err);
  }
};

const patchMasterData = async (req, res, next) => {
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

const deleteMasterData = async (req, res, next) => {
  const { id } = req.params;
  try {
    // const deletedData = await MasterData.findByIdAndDelete(id);
    const deletedData = await MasterData.deleteOne({ id });

    if (!deletedData) {
      return res.status(404).json({
        msg: `No data found with ID: ${id}`,
      });
    }

    res.status(200).json({
      msg: `Data with ID: ${id} deleted successfully!`,
      id: deletedData.id,
    });
  } catch (error) {
    // Handle errors
    const err = {
      status: 400,
      msg: error.message,
      extraMessage: `Backend Issue deleteMasterData!`,
    };
    next(err);
  }
};

module.exports = {
  getAllMasterData,
  getMasterDataByKey,
  postMasterData,
  patchMasterData,
  deleteMasterData,
};
