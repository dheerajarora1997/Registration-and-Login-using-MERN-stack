const { Schema, model } = require("mongoose");

const CounterSchema = Schema({
  masterId: {
    type: String,
  },
  customerId: {
    type: String,
  },
  ticketId: {
    type: String,
  },
  userId: {
    type: String,
  },
});

const CounterId = new model("idCounter", CounterSchema);

module.exports = CounterId;
