// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models"), bcrypt = require('bcrypt');
var express = require('express'), userRoutes = express.Router();
var salt = "$2a$10$BMaZfkUboe3WS0TGkvmpOu";


userRoutes.get("/test/pass", function(req, res) {
    res.status(200).json({ 'message': 'Success'})
});


//=====================TEMPORARY INSERT, IGNORE BELOW============
userRoutes.get("/test", function(req, res) {
    res.status(501).json({ 'error': 'Not Implemented'})
});
//==================END OF TEMPORARY INSERT, IGNORE ABOVE========

// POST route for creating a new user
userRoutes.post("/user", function(req, res) {
    //bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        db.signIn.create({
            username: req.body.username,
            password: req.body.password//hash
        }).then(function(dbPost) {
                res.status(200).json({'status': 'success'}); //res.redirect('/login/sign-in')
            }); //.catch(function(err) { res.render ('sign-up', {status: can't create, error: err}
    //});

});

/*// GET route for retrieving user
userRoutes.get("/user/profile/:id", function(req, res) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        db.signIn.create({
            username: req.body.username,
            password: hash
        }).then(function(dbPost) {
            res.status(200).json({'status': 'success'});
        });
    });

});




userRoutes.get(sign-up, function (req, res) {
res.render('sign-up')*/




















userRoutes.post("/user/signin", function(req, res) {
    db.signIn.findOne({
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