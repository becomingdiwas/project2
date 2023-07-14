const express = require("express");
require('dotenv').config();
const path = require("path");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const config = require('./config');

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Start the server
const server = app.listen(5000, () => {
  console.log('Server started on port 5000');
});

// Establish a MySQL connection
const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL CONNECTED");
  }
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port 5000 is already in use. Please choose a different port.');
  } else {
    console.log('An error occurred while starting the server:', err);
  }
});