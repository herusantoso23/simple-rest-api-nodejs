const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const authCheck = require('../authentication/auth');

router.post('/signup', userService.sign_up);

router.post('/login', userService.login);

router.delete('/:userId', authCheck, userService.delete_user);


module.exports = router;