//code to read and set any environment variables with the dotenv package
require("dotenv").config(); 

var keyInfo = require("./keys.js");

var spotifyNode = require('node-spotify-api');
 
var spotify = new spotifyNode(keyInfo.spotify);
   
  spotify.search({type: 'track', query: 'All the Small Things', limit: 2}, function(err, result) {
      if (err) {
          console.log(err);
      }
      console.log(JSON.stringify(result, null, 2));
  });
 