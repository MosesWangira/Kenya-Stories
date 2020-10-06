const mongoose = require('mongoose')


/*
SignUp Schema
*/
const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordLink: {
    type: String,
    default: ""
  },
  emailConfirmation: {
    type: Boolean,
    default: false
  }
});

const SignUp = mongoose.model("signupcollection", signUpSchema);
module.exports = SignUp


/*
Login Schema
*/

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const LogIn = mongoose.model("logincollection", loginSchema)
module.exports = LogIn
