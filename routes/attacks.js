const express = require('express');
const {attacks} = require('../controllers/attacks');
const validator = require('../validator/validation');

const router = express.Router();

//post all attacks details to the database
router.post('/api/v1/attacks', validator.createAttackValidator, attacks);

module.exports = router
