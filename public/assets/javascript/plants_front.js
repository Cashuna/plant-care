//SETUP VARIABLES
var plantInfo = $("#plant-intro");

// Setting global variables for data pulled from Plants
var plantName;
var plantNameSci;
var plantType;
var plantOrigin;
var plantCycle;
var plantShape;
var matureHt;
var matureSprd;
var soil;
var water;
var sun;
var temp;
var sowBoolean;
var sowInfo;

// Setting global variables for data pulled from userProfiles
var uPlantName;
var uPlantHeight;
var uPlantWatered;
var uPlantSpread;
var uSoil;
var uPlantSun;
var uPlantTemp;
var uPlantTrim;


/***************************************************/
// FUNCTIONS
// Pulling data from the Plants table
var getPlantOverview = function() {
	console.log("Test");
	$.get("/api/plants", function(data) {
    	console.log("Plant data pulled!");
    	plantInfo.empty();
    	// Calling the plant data for the user's plant(s)
    	addPlantHead(data);
    	addPlantOverview(data);
        addPlantCare(data);
        addPlantTemp(data);
    	addPlantSize(data);
    	addPlantSow(data);
    }); 
};

var addPlantHead = function(data) {
    plantName = data.plant_name;

    $("#plant-head").append("<h1>Let's grow some " + plantName + "!</h1>");
};

var addPlantOverview = function(data) {
    plantNameSci = data.plant_name_sci;
    plantOrigin = data.origin;
    plantShape = data.plant_shape;

    $("#plant-intro").append("<p>Scientific name: " + plantNameSci + "</p><p>Origin: " + plantOrigin + "</p><p>Shape: " + plantShape + "</p>");
};

var addPlantCare = function(data) {
    soil = data.soil_type;
    plantCycle = data.lifecycle;

    $("#plant-care").append("<p>Lifecycle: " + plantCycle + "</p><p>Soil: " + soil + "</p>");
};

var addPlantTemp = function(data) {
    temp = data.tempF_grow_min + "&#8457; to " + data.tempF_grow_max + "&#8457;";

    $("#plant-care").append("<p>Ideal temperatures: " + temp + "</p>");
};

var addPlantSize = function(data) {
    matureHt = data.mature_ht_val.toFixed(1) + " " + data.mature_ht_unit;
    matureSprd = data.mature_sprd_val.toFixed(1) + " " + data.mature_sprd_unit;

    $("#plant-size").append("<p>Mature height: " + matureHt + "</p><p>Mature spread: " + matureSprd + "</p>");
};

var addPlantSow = function(data) {
    sowBoolean = data.sow_direct;
    sowInfo = data.sowing_depth_val.toFixed(1) + " " + data.sowing_depth_unit;

    if (sowBoolean === "Yes") {
    	$("#plant-size").append("<p>Sow directly? " + sowBoolean + " (Depth: " + sowInfo + " )</p>");
    } else {
    	$("#plant-size").append("<p>Sow directly? " + sowBoolean + "</p>");
    };
};

/***************************************************/
//MAIN PROCESSES
$(document).ready(function() {
	getPlantOverview();
});