const jwt = require("jsonwebtoken");
const { createError } = require("../middleware/errorHandler");

// CHECK TOKEN AND VERIFY AUTH
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};
// verify if user exists
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
    } else {
      next();
      return next(createError(403, "You are not authorized!"));
    }
  });
};
// verify admin
const verifyAdmin = (req, res, next) => {
  console.log("hey1");
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyAdmin, verifyToken, verifyUser };
