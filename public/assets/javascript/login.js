/***************************************************/
// FUNCTIONS

/***************************************************/
//MAIN PROCESSES
$(document).ready(function() {
	$("#user-login-btn").on("click", function(event) {
		event.preventDefault();

		var newSignIn = {
			username: $("#username").val().trim(),
			password: $("#password").val().trim()
		};

		console.log("creating new user!");

		 $.post("/newUser", newUserProfile)
	    .done(function(data) {
	    	console.log(data);
	    	alert("Adding user...");
	   	});

		// Emptying the form
		$("#username").val("");
		$("#password").val("");
	});
});