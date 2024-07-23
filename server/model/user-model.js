const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    require: false,
  },
});

// pre method for hash password
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified()) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    const err = {
      status: 400,
      message: `Error in pre method ${error}`,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
});

// jwt - JSON web token Genrate
userSchema.methods.genrateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        name: this.name,
        phone: this.phone,
        email: this.email,
        dateOfBirth: this.dateOfBirth,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    const err = {
      status: 400,
      message: `Error in generate Token ${error}`,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

// Password Compare

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// define the  modal or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
