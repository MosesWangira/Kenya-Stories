const express = require('express');
const {murders} = require('../controllers/murders');
const validator = require('../validator/validation');

const router = express.Router();

//post all murders details to the database
router.post('/api/v1/murders', validator.createMurderValidator, murders);

module.exports = router
