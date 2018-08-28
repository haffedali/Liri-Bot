// time to start
require("dotenv").config();
var request = require("request");
var inquirer = require("inquirer")
var Spotify = require("node-spotify-api");
//var search = process.argv[2];
var keys = require("./keys.js")
var spotify = new Spotify (keys.spotify);

inquirer.prompt([
  {
    type: "input",
    message: "You would like to search?",
    name: "api",
  }
]).then(function(response){
  switch (response.api){
    case "spotify": 
      inquirer.prompt([
        {
          type: "input",
          message: "What song do you want to look up?",
          name: "song"
        }]).then(function(response){
            var search = response.song;
            spotify.search({ type: 'track', query: search }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
              // console.log(data.tracks.items[0]);
              console.log(data.tracks.items[0].album.name);
              console.log(data.tracks.items[0].name);
              console.log(data.tracks.items[0].album.artists[0].name);
            //console.log(data.tracks.items[0].album.artists.href);
          });
        })
      break;
      case "omdb":
        inquirer.prompt([
          {
            type: "input",
            message: "Name a movie ya scrub",
            name: "movie"
          }]).then(function(r){
            var movie = r.movie;

            var queryUrl = "http://www.omdbapi.com/?t=" + movie +"&y=&plot=short&apikey=trilogy";
            request(queryUrl, function(error, response, body) {
              if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body).Genre);
              }
            });
          })
      break;
      case "artist":
          inquirer.prompt([
            {
              type: "input",
              message: "Who do you wanna see?",
              name: "artist"
            }
          ]).then(function(r){
            var artist = r.artist;
            var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
            request(queryUrl, function(error, response, body){
              if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body)[0]);
              }
            })
          })
  }
});
     




/*
console.log(keys.spotify);
//Spotify search function
spotify.search({ type: 'track', query: search }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0].album.name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].album.artists[0].name);
  //console.log(data.tracks.items[0].album.artists.href);
  });

///omdb search
*/
  