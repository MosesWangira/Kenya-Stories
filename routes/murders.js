const express = require('express');
const {murders, getAllMurdersData} = require('../controllers/murders');
const validator = require('../validator/validation');

const router = express.Router();

//post all murders details to the database
router.post('/api/v1/murders', validator.createMurderValidator, murders);

//get all murders details from database
router.get('/api/v1/getAllMurderDetails', getAllMurdersData);

module.exports = router
