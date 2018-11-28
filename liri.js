//code to read and set any environment variables with the dotenv package
require("dotenv").config(); 

var keyInfo = require("./keys.js");

var spotify = new Spotify(keys.spotify);

console.log(keyInfo);

