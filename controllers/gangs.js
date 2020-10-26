const express = require('express');
const mongoose = require('mongoose');

const Gangs = require('../models/gangs');

exports.gangs = (req, res) => {
  const gangs = new Gangs(req.body);

  //Data to be saved to database and sent as json
  const gangsSchema = new Gangs({
    gangName: gangs.gangName,
    president: gangs.president,
    yearOfUprising: gangs.yearOfUprising,
    gangHood: gangs.gangHood,
    smallDescription: gangs.smallDescription,
    description: gangs.description
  });

  //save to database
  gangsSchema.save().then(result => {
    res.status(200).json({
      result
    })
  })

};

/*
Get all attacks from the database
*/
exports.getAllGangsData = (req, res) => {
  const gangs = Gangs.find()
  .then((gangs) => {
    res.status(200).json({
      status:200,
      result: gangs
    })
  })
  .catch(err => console.log(err));
};
