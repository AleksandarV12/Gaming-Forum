const { userModel, tokenBlacklistModel } = require("../models");
const utils = require("../utils");
const { authCookieName } = require("../app-config");

const bsonToJson = (data) => JSON.parse(JSON.stringify(data));

const removePassword = (data) => {
  const { password, __v, ...userData } = data;
  return userData;
};

async function register(req, res, next) {
  const { username, email, password, repeatPassword } = req.body;

  // Password hashing (you should have a hashing function defined)
  const hashedPassword = await utils.hashPassword(password);

  if (password !== repeatPassword) {
    return res.status(400).send({ message: "Passwords do not match!" });
  }

  try {
    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = utils.jwt.createToken({ id: createdUser._id });

    res.cookie(authCookieName, token, {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    });
    res.status(201).send(removePassword(createdUser));
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      const field = err.message
        .split("index: ")[1]
        .split(" dup key")[0]
        .split("_")[0];
      return res
        .status(409)
        .send({ message: `This ${field} is already registered!` });
    }
    next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const match = user ? await user.matchPassword(password) : false;

    if (!match) {
      return res.status(401).send({ message: "Wrong email or password" });
    }

    const token = utils.jwt.createToken({ id: user._id });
    res.cookie(authCookieName, token, {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    });
    res.status(200).send(removePassword(user));
  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  const token = req.cookies[authCookieName];

  try {
    await tokenBlacklistModel.create({ token });
    res
      .clearCookie(authCookieName)
      .status(204)
      .send({ message: "Logged out!" });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getProfileInfo(req, res, next) {
  const { _id: userId } = req.user;

  try {
    const user = await userModel.findOne(
      { _id: userId },
      { password: 0, __v: 0 }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function editProfileInfo(req, res, next) {
  const { _id: userId } = req.user;
  const { username, email } = req.body;

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { username, email },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  register,
  logout,
  getProfileInfo,
  editProfileInfo,
};
