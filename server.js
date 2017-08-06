// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken"), jwtExp = require("express-jwt");
var exphbs = require("express-handlebars");
var value = require("./webStringValue");
var path = require("path");

/*******************************************/
// SETTING UP THE EXPRESS APP
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring the models for syncing
var db = require("./models");

app.use(cookieParser(value));

// Setting up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serving static content for the app from the "public" directory in the app directory
// publicPath2 is a variable that stores the initial project parameter passed to express.static
/*var publicPath = path.resolve(__dirname, "public"), publicPath2 = process.cwd() + "/public";
app.use(express.static(publicPath));*/
app.use(express.static(process.cwd() + "/public"));

// Overriding with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//Handlebars
var viewsPath = path.join(__dirname, "public", "views");
app.set("views", viewsPath);
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    layoutsDir: viewsPath + "/layouts"
}));
app.set("view engine", "handlebars");

/*******************************************/
// ROUTES
// Importing routes and giving the server access to them
require("./controllers/plants_controller.js")(app);
require("./controllers/userProfile_controller.js")(app);
//require("./controllers/userSignIn_controller.js")(app);

var auth = require("./controllers/userSignIn_controller.js");
app.use("/auth", auth);

app.use("/api", require("./controllers/userProfile_controller.js"));
app.use("/api", require("./controllers/plants_controller.js"));
app.use("/api", jwtExp({secret: value}));

app.use("/auth/login", function (req, res, next) {
    // check authorization
    if (!req.header('Authorization')) {
        res.status(401).json({ "status": "Not Authorized"});
    } else {
        jwt.verify(req.header("Authorization"), value, function(err, decoded) {
            if (err) {
                console.log("err", err);
                res.status(401).json({ "status": "Not Authorized"});
            } else {
                console.log(decoded.data);// bar
                // query db for privileges for user
                // add to req.privs
                // if authorized next()
                next();
            }
        });
    }
    // else res.status(401).json({})
});

app.get("/dashboard", jwtExp({
        secret: value,
        getToken: function wrapCookie(req) {
            if (req.signedCookies) {
                return req.signedCookies.userToken;
            }
            return null;
        },
    credentialsRequired: false
    }),
    function(req, res, next) {
    if (req.user) {
        res.sendFile(path.join(__dirname, "./public/dashboard.html"));
    }
    else{
        res.redirect("/auth/login");
    }
});

/*app.use('/', plant);*/

// Syncing the sequelize models and then starting the express app
db.sequelize.sync().then( function() {
    app.listen(PORT, function() {
      console.log("Listening on PORT " + PORT);
    });
});