const express = require('express');
const SignUp = require('../models/auth')


exports.signup = (req, res) => {
  var signup = new SignUp(req.body);

  //save to database
  signup.save().then(result => {
    res.status(200).json({
      status: 200,
      result: result
    });
  });
};

exports.getAllUsers = (req, res) => {
  const signup = SignUp.find()
  .then((signup) => {
    res.status(200).json({
      status:200,
      result: signup
    })
  })
  .catch(err => console.log(err));
};
