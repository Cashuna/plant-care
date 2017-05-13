// Plant controller --> Nicole is using this file for getting the plant care data from the stored database

var express = require("express");
var router = express.Router();
var db = require("../models");

// GET route 
router.get("/api/plants", function(req, res) {
	db.Plant.findAll({

	})
	.then(function(dbPlant) {
		return res.render(dbPlant);
	})
	.catch(function(err) {
		throw err;
	});
});