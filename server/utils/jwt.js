const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// decoded payload
const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

// sending  cookie as res
const attachCookiesToResponse = ({ req, res, user }) => {
  const token = createJWT(user);
  // setting cookie expiry to 24 hours
  const duration = 1 * 24 * 60 * 60 * 1000;
  const { secure } = req;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + duration),
    secure,
    signed: true,
    sameSite: "none",
  });
};

module.exports = {
  createJWT,
  verifyJWT,
  attachCookiesToResponse,
};
