// DEPENDENCIES
var express = require("express");
var db = require("../models");
var path = require("path");


/***************************************************/
// ROUTES
module.exports = function(app) {
	// GET route for pulling the user's plant data
	app.get("/api/user/:plant", function(req, res) {
		// Pulling the user's plant data for the specified plant
		db.userProfile.findAll({
			where: {
				// Dummy data for testing - will pull from user sign-in & plant selected by user in form
				plantName: "Dill",
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
			signInId: req.body.signInId
		}).then(function(dbUserProf) {
			console.log(dbUserProf);
			console.log("post worked!");

			res.redirect("/api/user/plant");
			res.render(dbUserProf);

			////**** Need to redirect to dashboard
		})
		.catch(function(err) {
			// If not successful, throwing the error
			throw err;
		});
	});

	// DELETE route for deleting a plant from the user's profile
	app.delete("/api/user/:plant", function(req, res) {
		db.userProfile.destroy({
			where: {
				plantName: req.params.plant
			}
		}).then(function(dbUserProf) {
			res.json(dbUserProf);
		})
		.catch(function(err) {
			// If not successful, throwing the error
			throw err;
		});
	});

	// PUT route for updating a plant in the user's profile
	app.put("/api/user/:plant", function(req, res) {
		db.userProfile.update(
			req.body,
			{
				where: {
					plantName: req.params.plant
				}
			})
			.then(function(dbUserProf) {
				res.json(dbUserProf);
			})
			.catch(function(err) {
				// If not successful, throwing the error
				throw err;
			});
	});
};