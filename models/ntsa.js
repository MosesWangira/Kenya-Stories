/*
NTSA Schema
*/
const mongoose = require('mongoose')
const ntsaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  }
});

const Ntsa = mongoose.model("ntsacollection", ntsaSchema);
module.exports = Ntsa
