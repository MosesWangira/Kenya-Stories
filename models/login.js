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
