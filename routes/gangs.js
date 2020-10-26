const express = require('express');
const {gangs, getAllGangsData} = require('../controllers/gangs');
const validator = require('../validator/validation');

const router = express.Router();

//post all attacks details to the database
router.post('/api/v1/gangs', validator.createGangsValidator, gangs);

//get all attacks database
router.get('/api/v1/getAllGangsData', getAllGangsData);

module.exports = router
