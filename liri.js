//code to read and set any environment variables with the dotenv package
require("dotenv").config(); 

//global variables
var keyInfo = require("./keys.js");
var moment = require('moment');
  moment().format();
var fs = require("fs");
var args = process.argv;
var request = process.argv[2];

//Spotify code
function runSpotify() {
  var spotifyNode = require('node-spotify-api');
  
  var spotify = new spotifyNode(keyInfo.spotify);
  var songQuery = args.slice(3).join("+");
  //console.log(songQuery);
   
  if (songQuery == "") {
    spotify.search({type: 'track', market: 'US', query: "Ace+of+Base", limit: 1}, function(err, result) {
      console.log("\r\n\r\n");
      //console.log(JSON.stringify(result, null, 2));
      console.log("Artist(s): " + result.tracks.items[0].artists[0].name);
      console.log("\r");
      console.log("Song Name: " + result.tracks.items[0].name);
      console.log("\r");
      console.log("Spotify Song Preview: " + result.tracks.items[0].preview_url);
      console.log("\r");
      console.log("Album: " + result.tracks.items[0].album.name);
      console.log("\r\n\r\n");
    })
  } else if (songQuery) {
    spotify.search({type: 'track', market: 'US', query: songQuery, limit: 1}, function(err, result) {

      console.log("\r\n\r\n");
      //console.log(JSON.stringify(result, null, 2));
      console.log("Artist(s): " + result.tracks.items[0].artists[0].name);
      console.log("\r");
      console.log("Song Name: " + result.tracks.items[0].name);
      console.log("\r");
      console.log("Spotify Song Preview: " + result.tracks.items[0].preview_url);
      console.log("\r");
      console.log("Album: " + result.tracks.items[0].album.name);
      console.log("\r\n\r\n");

    }) 
  };

      };

runSpotify();

//OMDB API code
function runMovie() {
  var axios = require("axios");
  var movieName = args.slice(3).join("+"); //take a copy of an array and make a new variable 
  //console.log(movieName);

  // Then run a request with axios to the OMDB API with the movie specified
  if (movieName == "") {
    var defaultMovieUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";

      axios.get(defaultMovieUrl).then(
      function(result) {

          console.log("\r\n\r\n");
          console.log("Movie Title: " + result.data.Title);
          console.log("\r");
          console.log("Movie Release Year: " + result.data.Year);
          console.log("\r");
          console.log("IMDB Rating: " + result.data.imdbRating);
          console.log("\r");
          console.log("Rotten Tomatoes Rating: " + result.data.Ratings[1].Value);
          console.log("\r");
          console.log("Production Country: " + result.data.Country);
          console.log("\r");
          console.log("Production Language: " + result.data.Language);
          console.log("\r");
          console.log("Movie Plot: " + result.data.Plot);
          console.log("\r");
          console.log("Movie Actors: " + result.data.Actors);
          console.log("\r\n\r\n");
      
      }); 
  
    } else if (movieName) {
      var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

      axios.get(movieUrl).then(
      function(result) {

          console.log("\r\n\r\n");
          console.log("Movie Title: " + result.data.Title);
          console.log("\r");
          console.log("Movie Release Year: " + result.data.Year);
          console.log("\r");
          console.log("IMDB Rating: " + result.data.imdbRating);
          console.log("\r");
          console.log("Rotten Tomatoes Rating: " + result.data.Ratings[1].Value);
          console.log("\r");
          console.log("Production Country: " + result.data.Country);
          console.log("\r");
          console.log("Production Language: " + result.data.Language);
          console.log("\r");
          console.log("Movie Plot: " + result.data.Plot);
          console.log("\r");
          console.log("Movie Actors: " + result.data.Actors);
          console.log("\r\n\r\n");
      
      }); 

  }
};

//runMovie();

//Bands in Town API code
function runBand() {
  var bandName = args.slice(3).join("+"); //take a copy of an array and make a new variable 
  //console.log(bandName);

  // Then run a request with axios to the Bands in Town API with the band specified
  if (request == "concert-this") {
      var bandUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

      axios.get(bandUrl).then(
      function(result) {
            var bandResults = result.data;

            for(i=0; i<bandResults.length; i++) {
            console.log("\r\n\r\n");
            console.log("Tour Name: " + bandResults[i].description);
            console.log("\r");
            console.log("Venue Name: " + bandResults[i].venue.name);
            console.log("\r");
            console.log("Venue Location: " + bandResults[i].venue.city + ", " + bandResults[i].venue.country);
            console.log("\r");
            console.log("Concert Date: " + moment(bandResults[i].datetime).format("MM/DD/YYYY"));
            console.log("\r\n\r\n");
        }
        
    })

  };

};

//runBand();

//do-what-it-says command
function runRandom() {
  if (request == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) { //callback thats taking in two arguments
      if (error) {
        return console.log(error); //can do return instead of else in the if else
      }
        //console.log(data);
        var dataArr = data.split(",");
        //console.log(dataArr);

        dataArr.forEach(function(randomThings) {
          console.log(randomThings);
          
          
        })

    })

  }
};

//put all requests into a log file - not working
function log() {
  fs.appendFile("log.txt", "songQuery, movieName, bandName", function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }

    // Otherwise, it will print: "movies.txt was updated!"
    console.log("log.txt was updated!");

  })
};

var liri = function(request, output) {
  switch (request) {
  case "spotify-this-song":
    deposit(value);
    break;
  case "withdraw":
    withdraw(value);
    break;
  default:
    console.log("You don't bank here");
  }
};