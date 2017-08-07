// DEPENDENCIES
//var express = require("express");
var db = require("../models");
var path = require("path");


/***************************************************/
// ROUTES
module.exports = function(app) {
	// GET route for displaying form page
	app.get("/form", function(req, res) {
	  	res.sendFile(path.join(__dirname, "../public/plantform.html"));
	});

	// GET route for pulling the user's plant data
	app.get("/api/user/plant", function(req, res) {
		// Pulling the user's plant data for the specified plant
		db.userProfile.findAll({
			where: {
				// Dummy data for testing - will pull from user sign-in ????
				signInId: 1
			},
			include: [db.signIn]
		})
		.then(function(dbUserProf) {
			// If call successful, logging that it was successful
			console.log("Success: User's plants data read");
			// Returning a JSON of the userProfile data
			console.log(dbUserProf);
			res.json(dbUserProf);
		})
		.catch(function(err) {
			// If not successful, throwing the error
			throw err;
		});
	});

	// POST route for saving a new plant to the user's profile
	app.post("/api/plant/new", function(req, res) {
		db.userProfile.create({
			plantName: req.body.plantName,
			plantHeight: req.body.plantHeight,
			plantWatered: req.body.plantWatered,
			plantSpread: req.body.plantSpread,
			plantSunlight: req.body.plantSunlight,
			temp: req.body.temp,	
			plantTrimmed: req.body.plantTrimmed,
			/// *** Need to connect to logged-in user
			signInId: req.body.signInId
		}).then(function(dbUserProf) {
			////**** Need to redirect to dashboard
			res.redirect("/dashboard");
			console.log("post worked!");
		})
		.catch(function(err) {
			// If not successful, throwing the error
			throw err;
		});
	});
};