const { Schema, model } = require("mongoose");
const { string } = require("zod");

const contactSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  status: {
    type: String,
  },
});

const Contact = new model("Contact", contactSchema);

module.exports = Contact;
