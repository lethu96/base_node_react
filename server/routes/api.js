var express = require('express');
var router = express.Router();

const users = require('../controllers/users');

/* GET home page. */
router.post('/user/register', users.register);
router.post('/user/login', users.login);


module.exports = router;
