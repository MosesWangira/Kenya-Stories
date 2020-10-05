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
  },
  name: {
    type: String,
  }
});

const SignUp = mongoose.model("SignUp", authSchema);

module.exports = SignUp
