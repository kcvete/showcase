const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/arts', require('./arts'));


module.exports = router;