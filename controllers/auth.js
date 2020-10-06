const express = require('express');
const SignUp = require('../models/auth')

//encrypting passwords using bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


/*
Sign up implementation
using bcrypt fo password hashing
*/
exports.signup = (req, res) => {
  var signup = new SignUp(req.body);

  bcrypt.hash(signup.password, saltRounds, (err, hash) => {
    const newUser = {
      name: signup.name,
      email: signup.email,
      password: hash,
      emailConfirmation: false,
      resetPasswordLink: ""
    }

    const query = {email: newUser.email}

    signup.findOne(query, (err, result) => {
      if(result == null){
        //save to database
        signup.insertOne(newUser, (err, result) => {
          const jsonObject = {
            status: 200,
            userId: newUser
          }
          //status 200 is OK
          res.status(200).send(jsonObject)
        })
      }else if (err) {
        //status 400 is failed response
        const jsonObjectError = {
          status: 400,
          error: 'email already registered'
        }
        console.log(err);
        res.status(400).send(jsonObjectError)
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
