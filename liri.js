require("dotenv").config();

var axios = require("axios");
var moment = require("moment");


var fs = require('fs');
var keys = require("./keys.js");

var artist = "", 
song = "", 
movie = "";


var concertThis = function (artist) {
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming").then(
            function (response) {
                var arrayObj = response.data;
                // loop through array of object
                for (var i = 0; i < arrayObj.length; i++) {
                    console.log(arrayObj[i].venue.name, arrayObj[i].venue.city + ", " + arrayObj[i].venue.region, moment(arrayObj[i].datetime).format("MM/DD/YYYY"));
                    // if (!i) { break; }
                }
            }

        ).catch(function (error) {
            console.log(error);
        })
}

var Spotify = require('node-spotify-api');
var spotify = new Spotify(
    {
        id: '594b2a6d8c4f4b06ae858f0022800df1',
        secret: 'ecc8dcade6344304b31c25dbc39721ed'
    }
);

var spotifySong = function (song) {
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            for (var i = 0; i < 15; i++) {
                console.log("Here's your song info. Artist: " + response.tracks.items[i].artists[i].name + " Song name: " + response.tracks.items[i].name);
                console.log("The album name: " + response.tracks.items[i].album.name + "  Song preview: " + response.tracks.items[i].external_urls.spotify);
                if (!i) { break; }

            }
        })
        .catch(function (err) {
            console.log("error occurred during spotifySong function" + err);
        });
}

var movieThis = function (movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(response.data.Title, response.data.Year, response.data.imdbRating, response.data.Ratings[1].Source, response.data.Ratings[1].Value, response.data.Country, response.data.Language, response.data.Plot, response.data.Actors);
        }
        );
}


data = [];

var readIt = function () {
    fs.readFile('./random.txt', 'utf8', function read(err, data) {
        if (err) { throw err;            
        }
        // directions(data);
        var text = data.split(",");
        console.log("Your file says: " + text[0], text[1]);
        var textNew = text[1];
        spotifySong(textNew);
        // return text;
    })
}

var directions = function () {
    if (process.argv[2] === "concert-this") {
        // var artist = process.argv[3];
        concertThis(process.argv[3]);
    } else if (process.argv[2] === "spotify-this-song") {
        // var song = process.argv[3];
        if (!process.argv[3]) {
            console.log("Your default song is 'The Sign' by 'Ace of Base'");
        }
        spotifySong(process.argv[3]);
    } else if (process.argv[2] === "movie-this") {
        // var movie = process.argv[3];
        
        if (process.argv[3] === false) {
            process.argv[3] = "Mr. Nobody"
            console.log("Your default movie is 'Mr. Nobody'.");
        }
        movieThis(process.argv[3]);
    } else if (process.argv[2] === "do-what-it-says") {
        console.log("going to readIt");
        readIt();
    } else {
        console.log("WHAT??!!!  START MAKING SENSE!")
    }
}

    directions();
