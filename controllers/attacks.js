const express = require('express');
const mongoose = require('mongoose');

const Attacks = require('../models/attacks');

exports.murders = (req, res) => {
  const attack = new Attacks(req.body);

  //Data to be saved to database and sent as json
  const attackSchema = new Murders({
    title: attack.title,
    president: attack.president,
    year: attack.year,
    place: attack.place,
    imageUrl: attack.imageUrl,
    description: attack.description
  });

  //save to database
  attackSchema.save().then(result => {
    res.status(200).json({
      status: 200,
      result: result
    })
  })

};
