// 1. Required packages to rin this program
require("dotenv").config();

var keys = require("./keys.js");

    // Axios package
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//---------------------------------------------------

// 2. Takes the user command and execute the corresponding method

console.log("--------------------------------------------------------------");
console.log("|  1)   node liri.js concert-this '<artist/band name here>'  |");
console.log("|  This will search the Bands in Town Artist Events API for  |");
console.log("|  an artist and render the information about each event to  |");
console.log("|  the terminal.                                             |");
console.log("|                                                            |")
console.log("|  2)   node liri.js spotify-this-song '<song name here>'    |");
console.log("|  This will search the Spotify API for an artist and render |");
console.log("|  the information about the artist of the song.             |");
console.log("|                                                            |")
console.log("|  3)   node liri.js movie-this '<movie name here>'          |");
console.log("|  This will search the OMDB API for the movie and render    |");
console.log("|  information about the searched movie.                     |");
console.log("|                                                            |")
console.log("|  4)   node liri.js do-what-it-says                         |");
console.log("|  LIRI will take the text inside of random.txt and then     |"); 
console.log("|  use it to call one of LIRI's commands.                    |");
console.log("|                                                            |")
console.log("--------------------------------------------------------------\n\n");

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

programChooser(splitedInput[0], searchTerm);
//console.log("LowerCase: ", commandInput);
//console.log("splited input: ", splitedInput);
//console.log("search Term : ", searchTerm);

//---------------------------------------------------

// 3. Choose what function to execute using switch
function programChooser(nameOfFunction, searchTerm) {
    if(nameOfFunction === "do-what-it-says"){
        doWhatItSays();
    } else {
        switch(nameOfFunction) {
            case "concert-this":
                concertThis(searchTerm);
                break;
            case "spotify-this-song":
                spotifyThisSong(searchTerm);
                break;
            case "movie-this":
                movieThis(searchTerm);
                break;
            /* case "do-what-it-says":
                doWhatItSays();
                break; */    
            default:
            console.log("please provide the input in the provided format");
        }
    }
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
function concertThis(searchTerm) {
    console.log("concert-this executed");
    // end point: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    // searchTerm;
    var searchURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    // console.log(searchURL);

    axios
        .get(searchURL)
        .then(function(response) {
            console.log("----------------------------");
            //console.log("Response: ", response);
            //console.log("----------------------------");
            // If the axios was successful...   
            // Then log the body from the site!
            //console.log("Response Data: ", response.headers.date);

            //console.log(typeof response.data.venue{name} );  

            /* 
            for(var key in response.data.Venue) {
                if(typeof response.data.Venue[key] !== 'function') {
                    console.log(response.data.Venue[key]);
                }
            }
            
 */
            console.log(response.data[0].venue.name);
            /* 
            for(var i = 0; i < response.data.length; i++) {
                console.log("Venue: ", response.data[i].venue);
            } */
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
function spotifyThisSong(searchTerm) {
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
 
/* 
{ Title: 'The Avengers',
  Year: '2012',
  Rated: 'PG-13',
  Released: '04 May 2012',
  Runtime: '143 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Joss Whedon',
  Writer:
   'Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)',
  Actors:
   'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth',
  Plot:
   'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
  Language: 'English, Russian, Hindi',
  Country: 'USA',
  Awards: 'Nominated for 1 Oscar. Another 38 wins & 79 nominations.',
  Poster:
   'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  Ratings:
   [ { Source: 'Internet Movie Database', Value: '8.1/10' },
     { Source: 'Rotten Tomatoes', Value: '92%' },
     { Source: 'Metacritic', Value: '69/100' } ],
  Metascore: '69',
  imdbRating: '8.1',
  imdbVotes: '1,191,030',
  imdbID: 'tt0848228',
  Type: 'movie',
  DVD: '25 Sep 2012',
  BoxOffice: '$623,279,547',
  Production: 'Walt Disney Pictures',
  Website: 'http://marvel.com/avengers_movie',
  Response: 'True' }
*/

function movieThis(searchTerm) {
    console.log("movieThis executed");
    var searchURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    // console.log(searchURL);

    axios
        .get(searchURL)
        .then(function(response) {
            //console.log("----------------------------");
            //console.log(response.data.Raitings);


            /* console.log("----------------------------");
            console.log("Title: ", response.data.Title);
            console.log("Year: ", response.data.Year);
            console.log("IMDB Rating: ", response.data.imdbRating);
            //console.log("Rotten Tomatoes: ", response.data.Raitings);
            console.log("Country: ", response.data.Country);
            console.log("Language: ", response.data.Language);
            console.log("Plot: ", response.data.Plot);
            console.log("Actors: ", response.data.Actors);

            
            console.log("----------------------------"); */
            
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
    //var commandInput = "";

    fs.readFile("random.txt", "utf8", function(err, data) {
        // If there's an error reading the file, we log it and return immediately
        if (err) {
          return console.log(err);
        }
        //console.log(data);

        var splitedInput = data.split(",");
        splitedInput[1] = splitedInput[1].substring(1, splitedInput[1].length - 1);
        //console.log(splitedInput);
        programChooser(splitedInput[0], splitedInput[1]);
        
        
        
    });



}


//---------------------------------------------------

// node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API 
// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") 
// for an artist and render the following information about each event to the terminal:

//    * Name of the venue
//    * Venue location
//    * Date of the Event (use moment to format this as "MM/DD/YYYY")












