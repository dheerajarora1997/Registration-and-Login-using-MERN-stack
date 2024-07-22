const User = require("../model/user-model");
var bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("This is the MERN Controller Page");
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};

const about = async (req, res) => {
  try {
    res.status(200).send("This is About Page");
  } catch (error) {
    res.status(400).send("This is Error");
    return new Error(error);
  }
};

const usersGet = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send("This is Error");
    return new Error(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, phone, email, dateOfBirth, isAdmin, password } = req.body;
    const userEmailExists = await User.findOne({ email });
    const userPhoneExists = await User.findOne({ phone });
    if (userEmailExists || userPhoneExists) {
      return res.status(409).send({
        msg: `user already exists with ${
          userEmailExists?.email || userPhoneExists?.phone
        }. Kindly Update`,
      });
    }
    const userCreated = await User.create({
      name,
      phone,
      email,
      dateOfBirth,
      isAdmin,
      password,
    });
    res.status(201).json({
      msg: userCreated,
      token: await userCreated.genrateToken(),
      userID: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).json(`${error}`);
    return new Error(error);
  }
};
const login = async (req, res) => {
  try {
    const { phone, email, password } = req.body;
    const userFromEmail = await User.findOne({ email });
    const userFromPhone = await User.findOne({ phone });
    const phoneOrMail = userFromEmail || userFromPhone;
    if (phoneOrMail) {
      const comparePassword = await phoneOrMail.comparePassword(password);
      if (comparePassword) {
        res.status(200).json({
          msg: `Welcome ${phoneOrMail?.name}`,
          token: await phoneOrMail.genrateToken(),
          userID: phoneOrMail._id.toString(),
        });
      } else {
        res.status(401).send("Invalid Credentials ");
      }
    } else {
      res
        .status(400)
        .send(
          `User not found with ${phone ? "phone " + phone : ""}${
            phone && email ? " or " : ""
          }${email ? "email " + email : ""}`
        );
    }
  } catch (error) {
    res.status(400).send(`${error}`);
  }
};

module.exports = { home, about, usersGet, register, login };
