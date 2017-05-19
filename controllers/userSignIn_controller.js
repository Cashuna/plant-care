// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models"), bcrypt = require('bcrypt');
var express = require('express'), userRoutes = express.Router();
var salt = "$2a$10$BMaZfkUboe3WS0TGkvmpOu";

//=======================BEGIN LOGIN=================================
userRoutes.get("/logIn", function (req, res) {
    res.render('logIn', {
        status: "Welcome, login"
    });
});

 userRoutes.post("/logIn", function(req, res) {
     db.signIn.findOne({
         username: req.body.username
     }).then(function(user) {
         if (!user) {
             console.log('no user found');
             res.status(400).json({'status' : 'Invalid username or password'
             });
             //TODO: add max login attempts
         }
         else {
             bcrypt.compare(req.body.password, user.password, function(err, valid) {
                 if (err || !valid) {
                     res.status(400).json({
                         'status' : 'Invalid username or password'
                     });
                 }
                 else {
                     res.status(200).json({
                         id: user.id,
                         username: user.username
                     });
                 }
             });
         }
     });
 });

//=======================BEGIN NEW USER===============================
userRoutes.get("/newUser", function (req, res) {
    res.render('newUser', {
        status: "Welcome, sign up."
    });
});

// POST route for creating a new user
userRoutes.post("/newUser", function(req, res) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        db.signIn.create({
            username: req.body.username,
            password: hash
        }).then(function(dbPost) {
            res.direct("/auth/logIn)");
        }); //.catch(function(err) { res.render ('sign-up', {status: can't create, error: err}
    });
});

//=========================END NEW USER===============================




// GET route for retrieving user
/*userRoutes.get("login", function(req, res) {
 bcrypt.hash(req.body.password, salt, function(err, hash) {
 // Store hash in your password DB.
 db.signIn.create({
 username: req.body.username,
 password: hash
 }).then(function(dbPost) {
 res.status(200).json({'status': 'success'}); //res.redirect('/login/sign-in');
 });
 });
 });*/
// Routes
// =============================================================
module.exports = userRoutes;