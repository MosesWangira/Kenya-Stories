const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const SignUp = require('../models/signup');
const Login = require('../models/login');

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
    TO DO("Send email upon registration")
    */
    const query = {email: signup.email};
    SignUp.findOne(query, (err, result) =>{
      if(err){
        const jsonError = {
          status: 401,
          result: "Contact Developer"
        }
        res.status(400).send(jsonError);
      }else if(result == null){
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
Login Implementation
*/

exports.login = (req, res) => {
  const login = new Login(req.body);

  const plainTextpassword = login.password

  //query email used to login from array
  const query = {email: login.email};

  SignUp.findOne(query, (err, user) => {
    if(err){
      const jsonError = {
        status: 401,
        result: err
      }
      res.status(401).send(jsonError)
    }else if (user == null) {
      const jsonError = {
        status: 403,
        result: 'email not registered'
      }
      res.status(403).send(jsonError)
    }else {
      var databasePassword = user.password

      bcrypt.compare(plainTextpassword, databasePassword, (err, result) =>{
        /* result == true send password and email
        result always equals to true
        */

        if(result == true){
          const token = jwt.sign({
            email: result.email,
            userId: result._id
          }, process.env.JWT_KEY,{
            expiresIn: "24h"
          });

          const jsonResult = {
            status: 200,
            token: token,
            result: user
          };

          //sed status 200 if response successful
          res.status(200).send(jsonResult);
        }else {
          const jsonError = {
            status: 400,
            error: 'wrong password'
          }
          //send status 400 if response is unsuccessful
          res.status(400).send(jsonError)
        }
      })
    }
  })

};

/*
resetpwd
*/
exports.resetpwd = (req, res) => {
  //query email used to login from array
  const query = {email: req.body.email};
  res.status(200).send(query)

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
