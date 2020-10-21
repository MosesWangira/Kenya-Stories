const express = require('express');
const mongoose = require('mongoose');

const Murders = require('../models/murders');

exports.murders = (req, res) => {
  const murder = new Murders(req.body);

  //Data to be saved to database and sent as json
  const murderSchema = new Murders({
    title: murder.title,
    president: murder.president,
    year: murder.year,
    imageUrl: murder.imageUrl,
    description: murder.description
  });

  //save to database
  murderSchema.save().then(result => {
    res.status(200).json({
      status: 200,
      result: result
    })
  })
  .catch(err => console.log(err));
  
};
