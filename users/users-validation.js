//imports
const jwt = require('jsonwebtoken');

//exports
module.exports = {
  validateUser,
  getJwtToken,
  checkRole
};

//helper functions
function validateUser(user) {
  let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
};

function getJwtToken(username) {
  const payload = {
    username,
    department: "HR"
  };

  const secret =
    process.env.JW_SECRET ||
    "QB9DJvfhRWMwnJbbWkyaHjwf6Sp7T7DzPn4eC0fH897tXEz8thgrmHPURBFnMLSwE20tgk5YsXzyolrzsagPm3OXX9HmIfG0pxFEQVYSahnJeGRNnWpw0TyHXCQo07V8";

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret, options);
}

function checkRole(role) {
    return function(req, res, next) {
        role === "HR" 
            ? next()
            : res.status(403).json({ message: "I used to want you dead but now I only want you gone" }) 
    }
}


