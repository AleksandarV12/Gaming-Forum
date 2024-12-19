const { userModel, tokenBlacklistModel } = require("../models");
const utils = require("../utils");
const { authCookieName } = require("../app-config");

const bsonToJson = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const removePassword = (data) => {
  const { password, __v, ...userData } = data;
  return userData;
};

async function register(req, res, next) {
  const { username, email, password, repeatPassword, avatarUrl } = req.body;

  if (password !== repeatPassword) {
    return res.status(400).send({ message: "Passwords do not match!" });
  }

  try {
    let createdUser = await userModel.create({
      username,
      email,
      password,
      avatarUrl,
    });
    createdUser = bsonToJson(createdUser);
    createdUser = removePassword(createdUser);

    const token = utils.jwt.createToken({ id: createdUser._id });
    const cookieOptions =
      process.env.NODE_ENV === "production"
        ? { httpOnly: true, sameSite: "none", secure: true }
        : { httpOnly: true };

    res.cookie(authCookieName, token, cookieOptions);
    res.status(201).send(createdUser);
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

    let userData = bsonToJson(user);
    userData = removePassword(userData);

    const token = utils.jwt.createToken({ id: userData._id });
    const cookieOptions =
      process.env.NODE_ENV === "production"
        ? { httpOnly: true, sameSite: "none", secure: true }
        : { httpOnly: true };

    res.cookie(authCookieName, token, cookieOptions);
    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  const token = req.cookies[authCookieName];

  if (token) {
    await tokenBlacklistModel.create({ token });
    res.clearCookie(authCookieName);
  }
  res.status(204).send({ message: "Logged out!" });
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
  const { avatarUrl, username, email } = req.body;

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { avatarUrl, username, email },
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
