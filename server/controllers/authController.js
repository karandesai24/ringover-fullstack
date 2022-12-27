const { User, Review, Order } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");
//register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all the values.");
  }
  const user = await User.create({ username, email, password });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ req, res, user: tokenUser });

  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password.");
  }
  const user = await User.findOne({
    where: { email: email },
    include: [
      { model: Review, as: "reviews" },
      { model: Order, as: "orders" },
    ],
  });
  if (!user) {
    throw new CustomError.UnAuthenticatedError("Invalid Credentials.");
  }
  // Instance method
  const isPasswordCorrect = await user.comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError("Invalid Credentials.");
  }
  const tokenUser = createTokenUser(user);
  //JWT token
  attachCookiesToResponse({ req, res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
//logout
const logout = async (req, res) => {
  // setting cookie
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out." });
};

module.exports = { register, login, logout };
