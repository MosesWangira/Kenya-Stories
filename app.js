//import express in this file
const express = require('express');
// execute express
const app = express();
var bodyParser = require('body-parser')
//hide sensitive data using dotenv package
require('dotenv/config')
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const murderRoute = require('./routes/murders');
const attackRoute = require('./routes/attacks');
const scandalsRoute = require('./routes/scandals');
const gangsRoute = require('./routes/gangs');

// MiddleWares
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


app.use('/', authRoute);
app.use('/', murderRoute);
app.use('/', attackRoute);
app.use('/', scandalsRoute);
app.use('/', gangsRoute);

let url =  process.env.DB_CONNECTION_URI || "mongodb://localhost:Kenya-Stories"

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(() =>
 console.log("DB Connected \n ", url)
);
mongoose.connection.on("error", err => {
  console.log("DB Connection Error:  ", err.message);
});

app.get('/', (req, res) => {
  res.send('NodeJS is fun and I wanna dive In deep');
})

let PORT = process.env.PORT || 80;
app.listen(PORT, () =>{
  console.log("Listening on port : ", PORT);
})
