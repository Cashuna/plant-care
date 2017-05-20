//MAIN PROCESSES
$(document).ready(function() {
	$("#user-plant-btn").on("click", function(event) {
		event.preventDefault();

		var newUserProfile = {
			plantName: $("#plant-name option:selected").text(),
			plantHeight: $("#plant-height").val().trim(),
			plantWatered: $("#plant-watered").val().trim(),
			plantSpread: $("#plant-spread").val().trim(),
			plantSunlight: $("#plant-sunlight").val().trim(),
			temp: $("#temp").val().trim(),	
			plantTrimmed: $("#plant-trimmed").val().trim(),
			signInId: 1
		};

		var userplant = $("#plant-name option:selected").text();

		 $.post("/api/plant/new", newUserProfile)
	    .done(function(data) {
	    	alert("Plant data added!");
	    	console.log("Plant data added!");
	   	});

		// Emptying the form
		$("#plant-name").val("");
		$("#plant-height").val("");
		$("#plant-watered").val("");
		$("#plant-spread").val("");
		$("#plant-sunlight").val("");
		$("#temp").val("");	
		$("#plant-trimmed").val("");
	});
});