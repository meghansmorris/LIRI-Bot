//code to read and set any environment variables with the dotenv package
require("dotenv").config(); 

//global variables
var keyInfo = require("./keys.js");
var args = process.argv;
var request = process.argv[2];

//Spotify code
var spotifyNode = require('node-spotify-api');
 
var spotify = new spotifyNode(keyInfo.spotify);
var songQuery = args.slice(3).join("+");
//console.log(songQuery);
   

  if (request == "spotify-this-song") {
    spotify.search({type: 'track', market: 'US', query: songQuery, limit: 1}, function(err, result) {
        if (err) {
          console.log("\r\n");
          console.log("Sorry, we can't find the song you're searching for, please try another track!");
          console.log("\r\n\r\n");
          return;
        }
        console.log("\r\n\r\n");
        //console.log(JSON.stringify(result, null, 2));
        console.log("Artist(s): " + result.tracks.items[0].artists[0].name);
        console.log("Song Name: " + result.tracks.items[0].name);
        console.log("Spotify Song Preview: " + result.tracks.items[0].preview_url);
        console.log("Album: " + result.tracks.items[0].album.name);
        console.log("\r\n\r\n");

    }); 
  };

//OMDB API code
var axios = require("axios");
var movieName = args.slice(3).join("+"); //take a copy of an array and make a new variable 
console.log(movieName);

var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// Then run a request with axios to the OMDB API with the movie specified
if (request == "movie-this") {
    axios.get(movieUrl).then(
    function(err, response) {
        if (err) {
            console.log("\r\n");
            console.log("Sorry, we can't find the movie you're searching for, please try another title!");
            console.log("\r\n\r\n");
            return;
          } else {
         console.log(response.data);
          }
        // console.log("Movie Title: " + response.data.Title);
        // console.log("Movie Release Year: " );
        // console.log("The movie's rating is: " + response.data.imdbRating);
        // console.log("The movie's plot is: " + response.data.Plot);
            }
        );

};