// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");


/*******************************************/
// SETTING UP THE EXPRESS APP
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring the models for syncing
var db = require("./models");

var jwt = require("jsonwebtoken");

// Setting up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));//???????

// Servi g static content for the app from the "public" directory in the app directory
app.use(express.static(process.cwd() + "/public"));

// Overriding with POST having ?_method=DELETE
app.use(methodOverride("_method"));


/*******************************************/
// ROUTES
// Importing routes and giving the server access to them
require("./controllers/plants_controller.js")(app);
require("./controllers/userProfile_controller.js")(app);
//require("./controllers/userSignIn_controller.js")(app);

var login = require("./controllers/userSignIn_controller.js");

app.use('/login', login);
/*app.use('/login/secure', function (req, res, next) {
    // check authorization
    // if authorized next()
    if (!req.header('Authorization')) {
        res.status(401).json({ 'status': 'Not Authorized'});
    } else {
        jwt.verify(req.header('Authorization'), 'randomsecretforsigningjwt', function(err, decoded) {
            if (err) {
                console.log('err', err);
                res.status(401).json({ 'status': 'Not Authorized'});
            } else {
                console.log(decoded.data);// bar
                // query db for privileges for user
                // add to req.privs
                next();
            }
        });
    }
    // else res.status(401).json({})
});
app.use('/api/secure', login);*/

// Syncing the sequelize models and then starting the express app
db.sequelize.sync().then( function() {
    app.listen(PORT, function() {
      console.log("Listening on PORT " + PORT);
    });
});