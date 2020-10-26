const express = require('express');
const {scandals, getAllScandalsData} = require('../controllers/scandals');
const validator = require('../validator/validation');

const router = express.Router();

//post all attacks details to the database
router.post('/api/v1/scandals', validator.createScandalsValidator, scandals);

//get all attacks database
router.get('/api/v1/getAllScandalsData', getAllScandalsData);

module.exports = router
