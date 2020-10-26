/*
Attack Schema
*/
const mongoose = require('mongoose')
const gangsSchema = new mongoose.Schema({
  gangName: {
    type: String,
    required: true
  },
  president: {
    type: String,
    required: true
  },
  yearOfUprising: {
    type: String,
    required: true
  },

  gangHood: {
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

const Gangs = mongoose.model("gangscollection", gangsSchema);
module.exports = Gangs
