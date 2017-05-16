// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var bcrypt = require('bcrypt');
var express = require('express');
var userRoutes = express.Router();

//var salt = '';

userRoutes.get("/test", function(req, res) {
    res.status(200).json({ 'message': 'Success'})
});



// POST route for creating a new user
userRoutes.post("/user", function(req, res) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        db.User.create({
            username: req.body.username,
            password: hash
        }).then(function(dbPost) {
                res.status(200).json({'status': 'success'});
            });
    });

});

userRoutes.post("/user/signin", function(req, res) {
    db.User.findOne({
        username: req.body.username
    })
        .then(function(user) {
            if (!user) {
                console.log('no user found');
                res.status(400).json({
                    'status' : 'Invalid username or password'
                });
            } else {
                bcrypt.compare(req.body.password, user.password, function(err, valid) {
                    if (err || !valid) {
                        res.status(400).json({
                            'status' : 'Invalid username or password'
                        });
                    } else {
                        res.status(200).json({
                            id: user.id,
                            username: user.username
                        });
                    }
                });
            }

        });
});

// Routes
// =============================================================
module.exports = userRoutes;