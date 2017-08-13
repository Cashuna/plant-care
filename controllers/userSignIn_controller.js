// *********************************************************************************
// userSignIn.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// ==================================================================
// Requiring our models
var db = require("../models"), bcrypt = require("bcrypt");
var express = require("express"), userRoutes = express.Router();
var jwt = require("jsonwebtoken"), jwtSigning = require("../webStringValue");
var salt = "$2a$10$BMaZfkUboe3WS0TGkvmpOu"; //TODO: create process.env. variable

// Routes
//=======================BEGIN LOGIN=================================
userRoutes.get("/login", function (req, res) {
    res.render("login", {
        status: "Welcome! Login below."
    });
});

userRoutes.post("/login", function(req, res, next) {
     var passwordAttempt = req.body.password;
     db.signIn.findOne({
         where: {
             username: req.body.username
         }
     }).then(function(user) {
         if (!user) {
             console.log("no user found");
             res.render("newuser", {"status": "Looks like you're a new user - create an account here."});
         }
             //TODO: add max login attempts
         else {
             bcrypt.compare(passwordAttempt, user.password, function(err, valid) {
                 if (err || !valid) {
                     res.render("newuser", {
                         "status" : "Invalid username or password. Need a new account? Create one here."
                     });
                 }
                 else {
                     var userToken = jwt.sign({
                         exp: Math.floor(Date.now() / 1000) + (60 * 60),
                         data: user.id
                     }, jwtSigning);
                     res.cookie("userToken", userToken, {
                         secure: process.env.NODE_ENV === "production",
                         signed: true
                     });
                     res.redirect("/dashboard");
                        /*res.status(200).json({
                            id: user.id,
                            username: user.username,
                            token: userToken
                        });*/
                 }
             });
         }
     }).catch(next);
 });//embed token in cookie

//=======================BEGIN NEW USER===============================
userRoutes.get("/newuser", function (req, res) {
    res.render("newuser", {
        status: "Welcome! Sign-up below."
    });
});
//console.log(bcrypt.genSaltSnyc(10));
// POST route for creating a new user
userRoutes.post("/newuser", function(req, res) {
    db.signIn.findOne({
         where: {
             username: req.body.username
         }
     }).then(function(user) {
        if (user) {
            console.log("username already exists.");
            res.render("newuser", {"status": "Username already taken. Please choose a different username."});
        }
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            db.signIn.create({
                username: req.body.username,
                password: hash
            }).then(function(dbPost) {
                res.redirect("/auth/login");
            }).catch(function(err) {
                res.status(400).json({status: "invalid username or password", error: err});
            })
        });
    });
});

//=================================URL Parse============================

userRoutes.post("/form?plant-height=:num1&plant-spread=:num2&temp=:num3&plant-sunlight=num4&plant-watered=:answer1&plant-trimmed=:answer2",
function(req, res){
   db.userProfile = {
       "plant-height": req.params.num1,
       "plant-spread": req.params.num2,
       "temp": req.params.num3,
       "plant-sunlight": req.params.num4,
       "plant-watered": req.params.answer1,
       "plant-trimmed": req.params.answer2
   };
   res.redirect("/dashboard");
});

// =============================================================
module.exports = userRoutes;