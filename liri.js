require("dotenv").config();
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var liriFunc = process.argv[2];
var number = process.argv[3];


if (liriFunc === "my-tweets") {

	console.log("my tweets");
}

if (liriFunc === "spotify-this-song") {

	console.log("Spotify");

}

if (liriFunc === "movie-this") {

	//Run a request to the OMDB API with the movie specified
	var movie = "Mr. Nobody";
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=10074fa4", function (error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {

			console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			console.log(JSON.parse(body));
		}
	});

	console.log("my movie");

}

