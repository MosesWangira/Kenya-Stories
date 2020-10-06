/*
SignUp Schema
*/

const mongoose = require('mongoose')
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
