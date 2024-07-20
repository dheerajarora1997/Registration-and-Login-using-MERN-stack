const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: "majority",
        j: true,
      },
    });
  } catch (error) {
    console.error(new Error(error));
    process.exit(0);
  }
};
// mongoose.connect(URI);

module.exports = connectDB;
