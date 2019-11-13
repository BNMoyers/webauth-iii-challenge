//import
const jwt = require("jsonwebtoken");

//exported middleware
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret =
      process.env.JW_SECRET ||
      "QB9DJvfhRWMwnJbbWkyaHjwf6Sp7T7DzPn4eC0fH897tXEz8thgrmHPURBFnMLSwE20tgk5YsXzyolrzsagPm3OXX9HmIfG0pxFEQVYSahnJeGRNnWpw0TyHXCQo07V8";

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "May I see your credentials, please?" });
  }
};
