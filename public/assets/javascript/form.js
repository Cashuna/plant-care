/***************************************************/
// FUNCTIONS


/***************************************************/
//MAIN PROCESSES
$(document).ready(function() {
	$("#user-plant-btn").on("click", function(event) {
		event.preventDefault();

		var newUserProfile = {
			//plantName: $("#plant-name").val().trim(),
			plantName: $("#plant-name option:selected").text(),
			plantHeight: $("#plant-height").val().trim(),
			plantWatered: $("#plant-watered").val().trim(),
			plantSpread: $("#plant-spread").val().trim(),
			plantSunlight: $("#plant-sunlight").val().trim(),
			temp: $("#temp").val().trim(),	
			plantTrimmed: $("#plant-trimmed").val().trim(),
			/// *** Need to connect to ID of user that is signed-in
			signInId: 1
		};

		console.log("test");

		 $.post("/api/plant/new", newUserProfile)
	    .done(function(data) {
	    	console.log(data);
	    	alert("Adding plant...");
	   	});

		// Emptying the form
		$("plant-name").val("");
		$("plant-height").val("");
		$("plant-watered").val("");
		$("plant-spread").val("");
		$("plant-sunlight").val("");
		$("temp").val("");	
		$("plant-trimmed").val("");
	});
});