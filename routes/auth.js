const express = require('express');
const {getAllUsers, signup, login, resetpwd, resetpwdscreen, resetpwddatabase} = require('../controllers/auth');
const validator = require('../validator/validation');
const tokenAuth = require('../middleware/token-login-validation')

const router = express.Router();
router.use(express.static(__dirname + '/views'));

//for testing purposes
router.get('/getAllSignUpDetails', getAllUsers);

//handles authentication normal email and password

//sign up
router.post('/auth/api/v1/signup', validator.createSignUpValidator, signup);

//login
router.post('/auth/api/v1/login', validator.createLoginValidator, login);

router.get('/auth/api/v1/tokenAutoLogin', tokenAuth);


//reset password sending link
router.post('/auth/api/v1/resetPassword', resetpwd);

//reset password resetPasswordScreen
router.get('/auth/api/v1/resetPassword/:token', resetpwdscreen);

router.post('/auth/api/v1/resetPassword/:token', resetpwddatabase);

module.exports = router
