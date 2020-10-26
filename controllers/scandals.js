const express = require('express');
const mongoose = require('mongoose');

const Scandals = require('../models/scandals');

exports.scandals = (req, res) => {
  const scandals = new Scandals(req.body);

  //Data to be saved to database and sent as json
  const scandlesSchema = new Scandals({
    title: scandals.title,
    president: scandals.president,
    year: scandals.year,
    mainSuspect: scandals.mainSuspect,
    imageUrl: scandals.imageUrl,
    smallDescription: scandals.smallDescription,
    description: scandals.description
  });

  //save to database
  scandlesSchema.save().then(result => {
    res.status(200).json({
      result
    })
  })

};

/*
Get all attacks from the database
*/
exports.getAllScandalsData = (req, res) => {
  const scandals = Scandals.find()
  .then((scandals) => {
    res.status(200).json({
      status:200,
      result: scandals
    })
  })
  .catch(err => console.log(err));
};
