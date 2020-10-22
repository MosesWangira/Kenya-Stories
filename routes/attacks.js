const express = require('express');
const {attacks, getAllAttacksData} = require('../controllers/attacks');
const validator = require('../validator/validation');

const router = express.Router();

//post all attacks details to the database
router.post('/api/v1/attacks', validator.createAttackValidator, attacks);

//get all attacks database
router.get('/api/v1/getAllAttacksData', getAllAttacksData);

module.exports = router
