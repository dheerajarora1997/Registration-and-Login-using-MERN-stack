const User = require("../model/user-model");
const Contact = require("../model/contact-model");
const { response } = require("express");

const home = async (req, res) => {
  try {
    res.status(200).send("This is the MERN Controller Page");
  } catch (error) {
    const err = {
      status: 400,
      message: error,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

const usersGet = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    const err = {
      status: 400,
      message: error,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

const register = async (req, res) => {
  try {
    const { name, phone, email, dateOfBirth, isAdmin, password } = req.body;
    const TotalRecords = await User.find({});
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
      userId: `u00${
        TotalRecords?.length > 999
          ? TotalRecords?.length + 1
          : 999 + TotalRecords?.length
      }`,
    });
    res.status(201).json({
      msg: userCreated,
      token: await userCreated.genrateToken(),
      userID: userCreated._id.toString(),
    });
  } catch (error) {
    const err = {
      status: 400,
      message: error,
      extraMessage: "Backend issue found!",
    };
    next(err);
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
    const err = {
      status: 400,
      message: error,
      extraMessage: "Backend issue found!",
    };
    next(err);
  }
};

const contactRecords = async (req, res) => {
  try {
    const recordResponse = await Contact.find({});
    res.status(200).json(recordResponse);
  } catch (error) {
    const err = {
      status: 400,
      message: error || "Unable to get Data!",
    };
    next(err);
  }
};
const contact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const messageCreated = await Contact.create({
      name,
      email,
      phone,
      message,
      status: "Pending",
    });
    res.status(200).json({
      msg: "Response Submitted Successfully.",
      responseStatus: messageCreated?.status,
    });
  } catch (error) {
    const err = {
      status: 400,
      message: error || "Error submitting form",
      extraMessage: "Unable to submit Form",
    };
    next(err);
  }
};

module.exports = {
  home,
  about,
  usersGet,
  register,
  login,
  contactRecords,
  contact,
};
