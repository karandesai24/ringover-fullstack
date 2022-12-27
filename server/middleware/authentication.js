const CustomError = require("../errors");
const { verifyJWT } = require("../utils");

// checks valid jwt token
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnAuthenticatedError("User is not authorized.");
  }
  try {
    const { username, userId, role } = verifyJWT(token);
    req.user = { username, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError("User authorization failed.");
  }
};

// roles stores an array of authorized user roles
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAuthorizedError(
        "Unauthorized to accesss this route."
      );
    }
    // proceed if user has permissions
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
