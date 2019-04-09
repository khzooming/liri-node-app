require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require('fs');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var song = "";
var movie = "";
var artist = "";


//   liri.js will be able to talk in one of the following commands:
// 
// * `concert-this`
var concertThis = function () {
    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response);
            // need to pull correct data from response and change date format using Moment
        }
    ).catch(function (error) {
        console.log(error);
})
}

var spotifySong = function () {
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log("error occurred during spotifySong function" + err);

            // need to pull correct data from response and reformat into correct data to print out
        })

}
var movieThis = function () {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response);
            console.log(response.data.Title, response.data.Year, response.data.imdbRating, response.data.Ratings[1].Source, response.data.Ratings[1].Value, response.data.Country, response.data.Language, response.data.Plot, response.data.Actors);
        }
    );
}

var readIt = function () {
    fs.readFile('random.txt')
    directions();
    console.log("I just read the file");
}

var directions = function () {
    if (process.argv[2] === "concert-this") {
        var artist = process.argv[3];
        concertThis();
    } else if (process.argv[2] === "spotify-this-song") {
        var song = process.argv[3];
        if (process.argv[3] === false) {
            var song = "The Sign"
            console.log("Your default song is 'The Sign' by 'Ace of Base'");
        }
        spotifySong();
    } else if (process.argv[2] === "movie-this") {
        var movie = process.argv[3];
        if (process.argv[3] === false) {
            var movie = "Mr. Nobody"
            console.log("Your default movie is 'Mr. Nobody'.");
        }
        movieThis();
    } else if (process.argv === "do-what-it-says") {
        readIt();
    } else {
        console.log("WHAT??!!!  START MAKING SENSE!")
    }
}

    directions();
