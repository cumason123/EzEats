const express = require('express');
const app = express();
const Web3 = require('Web3');
const bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.listen(8080, function(req, res) {
    console.log("Listening on localhost:8080/");
});

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/Login", function(req, res) {
	res.render("login");
});

app.get("/Registration", function(req, res) {
	res.render("Registration");
});

app.get("/Restaurants", function(req, res) {
	res.render("Restaurants");
});

app.get("/Registered", function(req, res) {
	res.render("Registered");
});

