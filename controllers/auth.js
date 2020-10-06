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

  bcrypt.hash(signup.password, saltRounds, (err, hash) => {

    //Data to be saved to database and sent as json
    const signUpSchema = new SignUp({
      name: signup.name,
      email: signup.email,
      password: hash,
      resetPasswordLink: signup.resetPasswordLink,
      emailConfirmation: signup.emailConfirmation
    });

   /*
    Check for duplicate entries before signing up the new user
    TO DO()
    */
    SignUp.findOne({email: signup.email}, (err, result) =>{
      if(result == null){
        //save to database
        signUpSchema.save().then(result => {
          res.status(200).json({
            status: 200,
            result: result
          })
        })
      }else{
        const jsonResult = {
          status: 400,
          result: "User with that email already exists"
        }
        res.status(400).send(jsonResult);
      }
    })


  })

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
