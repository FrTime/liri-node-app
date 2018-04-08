// Linking the keys.js file and setting the packet requirements
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Storing the argument array and user-entered command as variables
var pArgv = process.argv;
var command = process.argv[2];

// Storing the search term(s) as a variable
var searchParam = "";
for (i = 3; i < pArgv.length; i++) {
  if (i > 3 && i < pArgv.length) {
    searchParam = searchParam + "+" + pArgv[i];
  } else {
    searchParam = searchParam + pArgv[i];
  }
}

// Defining functions for entered commands

// Setting actions depending on command entered
switch (command) {
  case "my-tweets":
    console.log("Pulling your 20 most recent Tweets...");
    myTweets();
    break;

  case "spotify-this-song":
    if (searchParam) {
      console.log(`Searching Spotify for '${searchParam}'...`);
      spotifyThisSong(searchParam);
    } else {
      console.log(
        "No search term(s) entered. We hope you enjoy our selection:"
      );
      spotifyThisSong("The Sign");
    }
    break;

  case "movie-this":
    if (searchParam) {
      console.log(`Searching IMDB for '${searchParam}'...`);
      movieThis(searchParam);
    } else {
      console.log(
        "No search term(s) entered. We hope you enjoy our selection:"
      );
      movieThis("Mr. Nobody");
    }
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

  default:
    console.log("Please enter a valid command.");
}
