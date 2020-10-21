const express = require('express');
const {getAllUsers, signup, login} = require('../controllers/auth');
const validator = require('../validator/validation');

const router = express.Router();

//for testing purposes
router.get('/getAllSignUpDetails', getAllUsers);

//handles authentication normal email and password

//sign up
router.post('/auth/api/v1/signup', validator.createSignUpValidator, signup);

//login
router.post('/auth/api/v1/login', validator.createLoginValidator, login);

module.exports = router
