const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
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

const SignUp = mongoose.model("SignUp", authSchema);

module.exports = SignUp
