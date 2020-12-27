const express = require('express');
const {ntsa, getAllNtsaRules} = require('../controllers/ntsa');
const validator = require('../validator/validation');

const router = express.Router();

//post all ntsa details to the database
router.post('/api/v1/ntsa', validator.createNtsaValidator, ntsa);

//Get all ntsa fines and rules from the database
router.get('/api/v1/getAllNtsaRules', getAllNtsaRules);

module.exports = router
