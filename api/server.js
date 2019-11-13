//imports and dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const authRouter = require('../auth/auth-router');
// const usersRouter = require('../users/users-router');

//server
const server = express();

//middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

//server test
server.get('/', (req, res) => {
    res.send('testing');
});

//export
module.exports = server;