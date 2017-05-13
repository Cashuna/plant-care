// Plant controller --> Nicole is using this file for getting the plant care data from the stored database
// DEPENDENCIES
var express = require("express");
var db = require("../models");

var path = require("path");

/***************************************************/
// ROUTES
module.exports = function(app) {
	// GET route 
	app.get("/api/plants", function(req, res) {
		db.plant.findAll({})
		.then(function(dbPlant) {
			res.json(dbPlant);
			res.sendFile(path.join(__dirname + "/../public/chart.html"));
		})
		/*.catch(function(err) {
			throw err;
		});*/
	});
	// Creating test data
	/*router.post("/", function(req, res) {
		db.Plants.create({})
	})*/
};