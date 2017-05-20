// Plant controller
// DEPENDENCIES
var express = require("express");
var db = require("../models");
var path = require("path");


/***************************************************/
// ROUTES
module.exports = function(app) {
	// GET route for pulling all of the Plants data (from myfolia.com)
	app.get("/api/:plant?", function(req, res) {
		// Pulling all of the Plant Care data for the specified plant
		db.plant.findOne({
			where: {
				plant_name: req.params.plant
			}
		})
		.then(function(dbPlant) {
			// If call successful, logging that it was successful
			console.log("Success: Plants data read");
			// Returning a JSON of the Plants data
			res.json(dbPlant);
		})
		.catch(function(err) {
			// If call not successful, throwing the error
			throw err;
		});
	});

	// GET route for displaying login page
	app.get("/", function(req, res) {
	  	res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	// GET route for displaying dashboard.html
	app.get("/dashboard", function(req, res) {
	  	res.sendFile(path.join(__dirname, "../public/dashboard.html"));
	});
};