const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
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
  name: {
    type: String,
  },
  emailConfirmation: {
    type: String,
    default: false
  }
});

const SignUp = mongoose.model("SignUp", authSchema);

module.exports = SignUp
