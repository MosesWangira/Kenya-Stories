/*
Attack Schema
*/
const mongoose = require('mongoose')
const attackSchema = new mongoose.Schema({
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

  place: {
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
  }
});

const Attacks = mongoose.model("attackscollection", attackSchema);
module.exports = Attacks
