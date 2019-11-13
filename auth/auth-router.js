//imports and dependencies
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../users/users-model");
const { validateUser, getJwtToken } = require("../users/users-validation");

//endpoints for /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    db.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
          console.log(err.toString());
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({
      message: "User info is invalid. See errors for details",
      errors: validateResult.errors
    });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);
        res
          .status(200)
          .json({ message: `token delivery for ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log(err.toString());
      res.status(500).json(err);
    });
});

//exports

module.exports = router;
