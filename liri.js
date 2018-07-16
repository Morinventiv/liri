require("dotenv").config();
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
// var Spotify = require("node-spotify-api");
var spotify = require("spotify");

var Twitter = require("twitter");

// var Spotify = new Spotify(keys.spotify);

//Twitter function to get tweets
var getTweets = function () {
	var client = new Twitter(keys.twitter);

	var params = { screen_name: 'morinventiv1' };
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (!error) {
			// console.log(tweets);
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(' ');
				console.log(tweets[i].text);
			}
		}
	});
}
//end of Twitter function

var getArtistName = function (artist) {
	return artist.name;
}

//spotify npm package data -- 17:20
// var getSpotify = function () {

// 	spotify.search({ type: 'track', query: songName }, function (err, data) {
// 		if (err) {
// 			console.log('Error occurred: ' + err);
// 			return;
// 		}

// 		console.log(data);
// 	});
// }
//end of spotify pkg
var getMovie = function (movieName) {
	request('http://www.omdbapi.com/?apikey=10074fa4&t=' + movieName, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		var jsonData = JSON.parse(body);
		console.log('Title: ' + jsonData.Title);
		console.log('Year: ' + jsonData.Year);
		console.log('IMDB Rating: ' + jsonData.imdbRating);
		console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
		console.log('Country: ' + jsonData.Country);
		console.log('Language: ' + jsonData.Language);
		console.log('Plot: ' + jsonData.Plot);
		console.log('Actors: ' + jsonData.Actors);

	});
}

var pick = function (caseData, functionData) {
	switch (caseData) {
		case 'my-tweets':
			getTweets();
			break;
		case 'spotify-this-song':
			getSpotify(functionData);
			break;
		case 'movie-this':
			getMovie(functionData);
		default:
			console.log('LIRI does not know that task');
			break;
	}
}

var runThis = function (argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);