const express = require('express');
const mongoose = require('mongoose');
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
Login Implementation
*/

exports.login = (req, res) => {
  const login = new Login(req.body);

  //query email used to login from array
  const queryEmail = {email: login.email};

  Login.findOne(queryEmail, (err, result) => {
    if(err){
      const jsonError = {
        status: 400,
        result: err
      }
      res.status(400).send(jsonError);
    }else if (result.length == null) {
      const jsonError = {
        status: 403,
        result: "Register Email"
      }
      res.status(403).send(jsonError);
    }else {
      var arrayOfStrings = result.map(function(obj){

      })
    }
  });


  // var plainTextpassword = req.body.password

// //query email used to login from array
// var query = {email: req.body.email}
//
// collection.find(query).toArray((err, result) => {
//   if(err){
//     res.status(400).send(err)
//   }else if (result.length == 0) {
//     const objToSend = {
//         status: 400,
//         error: 'email not registered'
//     }
//     res.status(400).send(objToSend)
//   }else{
//     var arrayOfStrings = result.map(function(obj) {
//       // Load hash from your password DB.
//       bcrypt.compare(plainTextpassword, obj.password, function(err, result) {
//           // result == true send password and email
//           //result always equals to true
//           if(result == true){
//             const token = jwt.sign({
//               email: obj.email,
//               userId: obj._id
//             }, process.env.JWT_KEY,{
//               expiresIn: "1h"
//             })
//             const objToSend = {
//                 status: 200,
//                 token: token,
//                 userId: obj
//             }
//
//             //sed status 200 if response successful
//             res.status(200).send(objToSend)
//           }
//           else{
//             const objToSendError = {
//                 status: 400,
//                 error: 'wrong password'
//             }
//             //send status 404 if response is unsuccessful
//             res.status(400).send(objToSendError)
//           }
//       });
//
//     });
//   }
// })
//
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
