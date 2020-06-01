const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if there is no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    //Verify token and decode it
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Set user to user that is on the decoded token
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
