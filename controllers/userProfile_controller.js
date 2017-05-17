// DEPENDENCIES
var express = require("express");
var db = require("../models");
var path = require("path");


/***************************************************/
// ROUTES
module.exports = function(app) {
	// GET route for pulling all of the user's plant data
	app.get("/api/:user/plants", function(req, res) {
		// Pulling the user's plant data for the specified plant
		db.userProfile.findAll({})
		.then(function(dbUserProf) {
			// If call successful, logging that it was successful
			console.log("Success: User's plants data read");
			// Returning a JSON of the Plants data
			console.log(dbUserProf);
			res.json(dbUserProf);
		})
		.catch(function(err) {
			// If call not successful, throwing the error
			throw err;
		});
	});

	app.post("/api/:user/plants")
};