const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const SignUp = require('../models/signup');
const Login = require('../models/login');

//use nodemailer to send emails and xoauth2
const nodemailer = require('nodemailer')
const xoauth2 = require('xoauth2')

// require('dotenv/config')
require('dotenv').config()

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

  SignUp.findOne(query, (err, result) => {
    if(err){
      const jsonResetObj = {
        status: 400,
        error: err
      }
      res.status(400).send(jsonResetObj)
    }else if(result == null){
      const jsonResetObj = {
        status: 401,
        error: 'email does not exist'
      }
      res.status(401).send(jsonResetObj)
    }
    else {
      //send email to the user account if the user exist
      var emailToSendTo = req.body.email

      //generate random 6 figure number
      const generatedNumber = (Math.floor(100000 + Math.random() * 900000)).toString();

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.SENDER_EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN,
          expires: process.env.EXPIRES
        }
      });


      var mailOptions = {
        from: 'Kenyan Stories Application <${process.env.SENDER_EMAIL}>',
        to: emailToSendTo,
        subject: 'Reset password code',
        text: "Reset Password code" + "\n" + generatedNumber,
      }


      transporter.sendMail(mailOptions, function (err, res) {
        if(err){
          console.log(err);
        } else {
          //update resetpassword attribute in signup
          //find user by email and update password

          // const filter = { email: emailToSendTo };
          // const resetPasswordLink = { resetPasswordLink: generatedNumber };
          //
          // // `doc` is the document _after_ `update` was applied because of
          // // `new: true`
          // let doc = SignUp.findOneAndUpdate(filter, resetPasswordLink, {
          //   returnOriginal: false
          // });
          //
          // doc.save()

          // Update the document using `updateOne()`
          SignUp.updateOne({ email: emailToSendTo }, {
            resetPasswordLink: generatedNumber
          });

        }
      })

      const jsonResetObj = {
        status: 200,
        result: 'email sent to : ' + emailToSendTo
      }
      res.status(200).send(jsonResetObj)
    }
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
