const express = require('express');
const router = express.Router();
const authCheck = require('../authentication/auth');
const fileService = require('../service/fileService');

router.post('/upload', authCheck, fileService.file_upload);

module.exports = router;