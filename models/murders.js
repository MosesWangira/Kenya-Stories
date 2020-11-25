/*
Murders Schema
*/

const mongoose = require('mongoose')
const murdersSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  president: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
    },

  smallDescription: {
      type: String,
      required: true
    },

  description: {
    type: String,
    required: true
  },

  cause: {
    type: String,
    required: true
  }
});

const Murders = mongoose.model("murderscollection", murdersSchema);
module.exports = Murders
