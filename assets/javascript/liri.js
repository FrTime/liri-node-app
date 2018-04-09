// Linking the keys.js file and setting the packet requirements

require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require("fs");

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

function doWhatItSays() {
  // Turns text from selected file into an array by splitting at every "," found
  // Expected format: command,searchParam
  fs.readFile("random.txt", "utf8", function(error, data) {
    var randomArr = data.split(",");
    spotifyThisSong(randomArr[1]);
  });
}

function myTweets() {
  // Displays the 20 most recent tweets of the user
  // User name is set below:
  var userName = "Father_____Time";
  client.get("statuses/user_timeline", userName, function(
    error,
    tweets,
    response
  ) {
    if (error) throw error;
    for (i = 0; i < tweets.length; i++) {
      console.log(
        `@${userName} tweeted "${tweets[i].text}" at ${tweets[i].created_at}.`
      );
      console.log("\n-------------------- \n");
    }
  });
}

function spotifyThisSong(title) {
  // Displays the closest result to the entered search terms (song title)
  // If nothing is entered, "The Sign" by Ace of Bass is searched for instead
  spotify.search({ type: "track", query: title, limit: 1 }, function(
    error,
    data
  ) {
    if (error) throw error;
    for (var i = 0; i < data.tracks.items.length; i++) {
      var song = data.tracks.items[i];
      console.log(
        `Artist: ${song.artists[0].name} \nTrack Title: ${
          song.name
        } \nSpotify Preview Link: ${song.preview_url} \nAlbum: ${
          song.album.name
        } (Released ${song.album.release_date})`
      );
    }
  });
}

function movieThis(title) {
  // Displays the closest result to the entered search terms (movie title)
  // If nothing is entered, "Mr. Nobody" is searched for instead
  var URL =
    "http://www.omdbapi.com/?apikey=trilogy&t=" +
    title +
    "&plot=short&tomatoes=true";

  request(URL, function(error, response, body) {
    if (error) throw error;
    else if (!error && response.statusCode == 200) {
      var movie = JSON.parse(body);
      console.log(
        `Title: ${movie.Title} \nYear Released: ${movie.Year} \nIMDB Rating: ${
          movie.imdbRating
        } \nRotten Tomatoes Rating: ${
          movie.tomatoRating
        } \nCountry of Origin: ${movie.Country} \nLanguage: ${
          movie.Language
        } \nPlot: ${movie.Plot} \nCast: ${movie.Actors}`
      );
    }
  });
}

// Setting actions depending on which command is entered

switch (command) {
  case "my-tweets":
    console.log("Pulling your 20 most recent Tweets...\n");
    myTweets();
    break;

  case "spotify-this-song":
    if (searchParam) {
      console.log(`Searching Spotify for '${searchParam}'...
      `);
      spotifyThisSong(searchParam);
    } else {
      console.log(
        "No search term(s) entered. We hope you enjoy our selection:\n"
      );
      spotifyThisSong("The Sign Ace of Base");
    }
    break;

  case "movie-this":
    if (searchParam) {
      console.log(`Searching IMDB for '${searchParam}'...
      `);
      movieThis(searchParam);
    } else {
      console.log(
        "No search term(s) entered. We hope you enjoy our selection:\n"
      );
      movieThis("Mr. Nobody");
      console.log(
        "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ \nIt's on Netflix!\n"
      );
    }
    break;

  case "do-what-it-says":
    console.log();
    doWhatItSays();
    break;

  case "test":
    console.log(`Testing... Your search term(s): ${searchParam}
    `);
    break;

  default:
    console.log("Please enter a valid command.\n");
}
