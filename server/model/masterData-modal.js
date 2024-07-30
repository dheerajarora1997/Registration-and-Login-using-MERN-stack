const { Schema, model } = require("mongoose");

const MasterDataSchema = new Schema({
  id: {
    type: String,
  },
  key: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  valueType: {
    type: String,
    require: true,
  },
  parentCode: {
    type: String,
  },
  shortCode: {
    type: String,
  },
});

const MasterData = new model("MasterData", MasterDataSchema);

module.exports = MasterData;
