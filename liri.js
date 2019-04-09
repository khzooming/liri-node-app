require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


//   liri.js will be able to talk in one of the following commands:
// 
// * `concert-this`
var concertThis = function () {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response);
            // need to pull correct data from response and change date format using Moment
        }
    )
}

var spotifySong = function () {
    spotify.search({ type: 'track', query: song }, function (err, response) {
        if (err) {
            return console.log("error occurred during spotifySong function" + err);
        }
        // need to pull correct data from response and reformat into correct data to print out
        console.log(response);
    })
}

var movieThis = function () {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response);
            console.log(response.Title);
        }
    );
}



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
} else {
    console.log("WHAT??!!!  START MAKING SENSE!")
}



//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


//    // Then run a request with axios to the OMDB API with the movie specified
// axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
//     function(response) {
//       console.log("The movie's rating is: " + response.data.imdbRating);
//     }
