const express = require('express');
const {murders, getAllMurders} = require('../controllers/murders');
const validator = require('../validator/validation');

const router = express.Router();

router.get('/getAllMurders', getAllMurders);

//post all murders details to the database
router.post('/api/v1/murders', validator.createMurderValidator, murders);

module.exports = router
