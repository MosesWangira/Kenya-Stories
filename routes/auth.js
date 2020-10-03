const express = require('express');
const {getAllUsers, signup} = require('../controllers/auth');
const validator = require('../validator/validation');

const router = express.Router();

//for testing purposes
router.get('/getAllSignUpDeatils', getAllUsers);

//handles authentication normal email and password
router.post('/auth/api/v1/signup', validator.createSignUpValidator, signup);

module.exports = router
