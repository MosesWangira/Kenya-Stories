const express = require('express');
const mongoose = require('mongoose');
const SignUp = require('../models/auth');

//encrypting passwords using bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


/*
Sign up implementation
using bcrypt fo password hashing
*/
exports.signup = (req, res) => {
  const signup = new SignUp(req.body);

  const signUpSchema = new SignUp({
    name: signup.name,
    email: signup.email,
    password: signup.password,
    resetPasswordLink: signup.resetPasswordLink,
    emailConfirmation: signup.emailConfirmation
  });

  const query = {'email': signup.email}

  const signUpCollection = mongoose.model('SignUp', signUpSchema);

  // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
  // signUpCollection.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  //   if (err) return handleError(err);
  //   // Prints "Space Ghost is a talk show host".
  //   console.log('%s %s is a %s.', person.name.first, person.name.last,
  //   person.occupation);
  // });

  //
  // signup.save().then(result => {
  //   res.status(200).json({
  //     status: 200,
  //     result: result
  //   })
  // })

  // bcrypt.hash(signup.password, saltRounds, (err, hash) => {

    // const newUser = {
    //   name: signup.name,
    //   email: signup.email,
    //   password: hash,
    //   emailConfirmation: false,
    //   resetPasswordLink: ""
    // }

    signUpCollection.findOne(query, (err, result) => {
      if(err){
        //status 400 is failed response
        const jsonObjectError = {
          status: 400,
          error: err
        }
        console.log(err);
        res.status(400).send(jsonObjectError)
      }
      if(result == null){
        //save to database
        signup.save().then(result => {
          res.status(200).json({
            status: 200,
            result: result
          })
        })
      }else {
        //status 400 is failed response
        const jsonObjectError = {
          status: 400,
          error: 'email already registered'
        }
        console.log(err);
        res.status(400).send(jsonObjectError)
      }
    })
  // })

};


/*
Get all users fro the database
*/
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
