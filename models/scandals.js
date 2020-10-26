/*
Scandals Schema
*/
const mongoose = require('mongoose')
const scandalsSchema = new mongoose.Schema({
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

  mainSuspect: {
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

const Scandals = mongoose.model("scandalscollection", scandalsSchema);
module.exports = Scandals
