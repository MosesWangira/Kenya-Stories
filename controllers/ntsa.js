const express = require('express');
const mongoose = require('mongoose');

const Ntsa = require('../models/ntsa');

exports.ntsa = (req, res) => {
  const ntsa = new Ntsa(req.body);

  //Data to be saved to database and sent as json
  const ntsaSchema = new Ntsa({
    description: ntsa.description,
  });

  //save to database
  ntsaSchema.save().then(result => {
    res.status(200).json({
      result
    })
  })

};

/*
Get all ntsa fines and rules from the database
*/
exports.getAllNtsaRules = (req, res) => {
  const ntsa = Ntsa.find()
  .then((ntsa) => {
    res.status(200).json({
      status:200,
      result: ntsa
    })
  })
  .catch(err => console.log(err));
};
