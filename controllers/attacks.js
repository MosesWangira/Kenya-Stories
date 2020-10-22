const express = require('express');
const mongoose = require('mongoose');

const Attacks = require('../models/attacks');

exports.attacks = (req, res) => {
  const attack = new Attacks(req.body);

  //Data to be saved to database and sent as json
  const attackSchema = new Attacks({
    title: attack.title,
    president: attack.president,
    year: attack.year,
    place: attack.place,
    imageUrl: attack.imageUrl,
    smallDescription: attack.smallDescription,
    description: attack.description
  });

  //save to database
  attackSchema.save().then(result => {
    res.status(200).json({
      result
    })
  })

};

/*
Get all attacks from the database
*/
exports.getAllAttacksData = (req, res) => {
  const attack = Attacks.find()
  .then((attack) => {
    res.status(200).json({
      status:200,
      result: attack
    })
  })
  .catch(err => console.log(err));
};
