// 1. Required packages to rin this program
require("dotenv").config();

var keys = require("./keys.js");

    // Axios package
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//---------------------------------------------------

// 2. Takes the user command and execute the corresponding method

var commandInput = "";

for(var i = 2; i < process.argv.length; i++) {
    commandInput += process.argv[i] + " ";

}

commandInput = commandInput.substring(0, commandInput.length - 1);
commandInput = commandInput.toLowerCase();

var splitedInput = commandInput.split(" ");
var searchTerm = "";
for(var i = 1; i < splitedInput.length; i++) {
    searchTerm += " " + splitedInput[i];
}
searchTerm = searchTerm.substring(2, searchTerm.length - 1);

//console.log("LowerCase: ", commandInput);
//console.log("splited input: ", splitedInput);
//console.log("search Term : ", searchTerm);

//---------------------------------------------------

// 3. Choose what function to execute using switch

switch(splitedInput[0]) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;    
    default:
      console.log("please provide the input in the provided format");
  }

/* if(commandInput === "concert-this") {
    concertThis();
} else if(commandInput === "spotify-this-song") {
    spotifyThisSong();
} else if(commandInput === "movie-this") {
    movieThis();
} else {
    // commandInput === "do-what-it-says"
    doWhatItSays();
} */
//---------------------------------------------------

// 4. Implementing each function

    // 4.1 concert-this
function concertThis() {
    console.log("concert-this executed");
    // end point: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // searchTerm;
    var searchURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    // console.log(searchURL);

    axios
        .get(searchURL)
        .then(function(response) {
            console.log("----------------------------");
            console.log("Response: ", response);
            console.log("----------------------------");
            // If the axios was successful...
            // Then log the body from the site!
            console.log("Response Data: ", response.headers.date);
            

            console.log("Response Data: ", response.venue);
            console.log("----------------------------");
            
        })
  
  
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );

    

}

    // 4.2 spotify-this-song
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
function spotifyThisSong() {
    console.log("spotifyThisSong executed");
    
    
    
    spotify
        .search({ type: 'track', query: searchTerm })
        .then(function(response) {
            //console.log(response); 
            //console.log(response.tracks.items.length);
            
            for(var i = 0; i < response.tracks.items.length; i++) {
                console.log("// Item " + (i + 1) + " ------------------------------------------------------------------------------------------");
                console.log(response.tracks.items[i].album.artists);
                
                

                /* // Working album name
                //console.log("Album: ", response.tracks.items[i].album.name); */

                //console.log(response.tracks.items[i].artists);
                

                //console.log("//----------------------------------------------------------------------------------------------------------------");
                
                //console.log(response.tracks.items[i].artists[external_urls].name);
                //console.log(response.tracks.items[i].artists.external_urls);


                console.log("\n");
            }
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err); 
    });


}
    // 4.3 movie-this
        // Title of the movie.
        // Year the movie came out.
        // IMDB Rating of the movie.

        // Rotten Tomatoes Rating of the movie.

        // Country where the movie was produced.
        // Language of the movie.
        // Plot of the movie.
        // Actors in the movie.
 
function movieThis() {
    console.log("movieThis executed");
    var searchURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    // console.log(searchURL);

    axios
        .get(searchURL)
        .then(function(response) {
            //console.log("----------------------------");
            //console.log(response.data);
            console.log("----------------------------");
            console.log("Title: ", response.data.Title);
            console.log("Year: ", response.data.Year);
            console.log("IMDB Rating: ", response.data.imdbRating);
            //console.log("Rotten Tomatoes: ", response.data.Raitings);
            console.log("Country: ", response.data.Country);
            console.log("Language: ", response.data.Language);
            console.log("Plot: ", response.data.Plot);
            console.log("Actors: ", response.data.Actors);

            
            console.log("----------------------------");
            
        })
  
  
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );


}
    // 4.4 do-what-it-says
function doWhatItSays() {
    console.log("doWhatItSays executed");

}


//---------------------------------------------------

// node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API 
// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
// for an artist and render the following information about each event to the terminal:

//    * Name of the venue
//    * Venue location
//    * Date of the Event (use moment to format this as "MM/DD/YYYY")












