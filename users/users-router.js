//imports
const router = require('express').Router();
const db = require('./users-model');
const restricted = require('../auth/restricted-middleware');
const { checkRole } = require('./users-validation');

//restricted endpoint
router.get('/', restricted, checkRole('HR'), (req,res) => {
    db.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => res.send(err))
})

//export

module.exports = router