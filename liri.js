//initial authorizations
var fs = require("fs");
var axios = require("axios");

//code to read and set any environment variables with the dotenv package
require("dotenv").config();
//add code to reauire import keys.js file and store it in varable
var keys = require("./keys.js");

//console.log env SPOTIFY ID/SECRET
//console.log (process.env.SPOTIFY_ID)

//Pulled From Spotify API Instructions
var Spotify = require('node-spotify-api');

//Create Spotify Var
var spotify = new Spotify(
  keys.spotify
);

//Var For All Command Line Arugments
var inputString = process.argv.splice(3).join(" ");
var command = process.argv[2];

function SpotifySong(input) {
  //Spotify Search Query Function
  spotify.search({
    type: 'track',
    query: input ? input : 'The Sign'
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var songData = data.tracks.items;

    // * Artist(s)
    console.log("------Query Results-------")
    console.log(songData[0].artists[0].name);

    // * The song's name
    console.log(songData[0].name);

    // * A preview link of the song from Spotify
    console.log(songData[0].preview_url);

    // * The album that the song is fromn
    console.log(songData[0].album.name)
    console.log("------END Query Results----")

    // * If no song is provided then your program will default to "The Sign" by Ace of Base.


  });
}
//OMDB REQUEST
// Then run a request with axios to the OMDB API with the movie specified

function OmdbThis(inputString) {
  axios.get("http://www.omdbapi.com/?t=" + inputString + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log(response.data); //console.log("Release Year: " + response.data.Year);
    }
  );
}

const DoIt = function () {

  //read existing txt file containing song
  fs.readFile("random.txt", "utf8", function (err, data) {

    //log in case of error
    if (err) {
      return console.log(err);
    }
    //pull existing data from txt file
    data = data.split(",");
    console.log(data)

    for (var i = 0; i < data.length; i++) {
      console.log(i % 2)
      if (i % 2 === 0) {
        RunLiri(data[i], data[i + 1])
      }
    }
  })
}

function RunLiri(com, input) {
  switch (com) {
    case "spotify-this":
      SpotifySong(input);
      break;
    case "omdb-this":
      OmdbThis();
      break;
    case "do-what-it-says":
      DoIt();
      break;
    default:
      console.log("Give better command")
  }
}

RunLiri(command, inputString);