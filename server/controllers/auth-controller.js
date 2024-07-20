const User = require("../model/user-model");

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
    console.log(phone, email, password);
    res.status(200).send(`Welcome ${email}`);
  } catch (error) {
    res.status(400).send(`${error}`);
  }
};

module.exports = { home, about, usersGet, register, login };
