// 1. Required packages to rin this program
require("dotenv").config();

var keys = require("./keys.js");

    // Axios package
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
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
searchTerm = searchTerm.substring(1, searchTerm.length);
//console.log(searchTerm);

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

//---------------------------------------------------

// 4. Implementing each function

    // 4.1 concert-this
function concertThis(searchTerm) {
    console.log("concert-this executed");
    // end point: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log("Search Term: " + searchTerm);
    var searchURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    // console.log(searchURL);

    axios
        .get(searchURL)
        .then(function(response) {
            fs.readFile("log.txt", "utf8", function(err, data) {
                // If there's an error reading the file, we log it and return immediately
                if (err) {
                  return console.log(err);
                }
                fs.appendFileSync("log.txt", "----------------------------\n");
                fs.appendFileSync("log.txt", ("concert-this: " + searchTerm + " -> executed\n"));

                for(var i = 0; i < response.data.length; i++) {
                    console.log("----------------------------");
                    
                    console.log((i + 1) + ".    Venue: ", response.data[i].venue.name);
                    fs.appendFileSync("log.txt", ((i + 1) + ".    Venue: " + response.data[i].venue.name + "\n"));
                    
                    console.log("      City:  ", response.data[i].venue.city);
                    fs.appendFileSync("log.txt", ("      City:  " + response.data[i].venue.city + "\n"));
                    
                    console.log("      Date:  ", moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    fs.appendFileSync("log.txt", ("      Date:  " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n"));

                    console.log("----------------------------");
                }
                fs.appendFileSync("log.txt", "----------------------------\n");
                
            });
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
    console.log("Search Term: " + searchTerm);
    if(!searchTerm) {
        console.log("search term not provided");
        searchTerm = "The Sign";
    }
    
    spotify
        .search({ type: 'track', query: searchTerm })
        .then(function(response) {
            //console.log(response.tracks.items);

            
            fs.readFile("log.txt", "utf8", function(err, data) {
                // If there's an error reading the file, we log it and return immediately
                if (err) {
                  return console.log(err);
                }

                
                fs.appendFileSync("log.txt", ("spotify-this-song: " + searchTerm + " -> executed\n"));

                for(var i = 0; i < response.tracks.items.length; i++) {
                    console.log("\n----------------------------");
                    console.log("Item " + (i + 1) + '.');
                    console.log("Artist: " + response.tracks.items[i].artists.map(getArtistNames));
                    console.log("Song: " + response.tracks.items[i].name);
                    console.log("Preview: ", response.tracks.items[i].preview_url);
                    console.log("Album: ",  response.tracks.items[i].album.name)
                    console.log("----------------------------");

                    fs.appendFileSync("log.txt", "\n----------------------------");
                    fs.appendFileSync("log.txt", ("\nItem " + (i + 1) + '.\n'));
                    fs.appendFileSync("log.txt", ("      Artist:  " + response.tracks.items[i].artists.map(getArtistNames) + "\n"));
                    fs.appendFileSync("log.txt", ("      Song:  " + response.tracks.items[i].name + "\n"));
                    fs.appendFileSync("log.txt", ("      Preview:  " + response.tracks.items[i].preview_url + "\n"));
                    fs.appendFileSync("log.txt", ("      Album:  " + response.tracks.items[i].album.name + "\n"));
                    fs.appendFileSync("log.txt", "----------------------------");
                }
            }); 
            
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
function movieThis(searchTerm) {
    console.log("movieThis executed");
    
    
    // console.log(searchURL);
    if(!searchTerm) {
        console.log("search term not provided");
        searchTerm = "Mr. Nobody";
    }
    console.log("Search Term: " + searchTerm);
    var searchURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    
    axios
        .get(searchURL)
        .then(function(response) {
            //console.log("----------------------------");
            //console.log(response.data.Raitings);


            /* console.log("----------------------------");
            console.log("Title: ", response.data.Title);
            console.log("Year: ", response.data.Year);
            console.log("IMDB Rating: ", response.data.imdbRating);
            console.log("Rotten Tomatoes: ", response.data.Ratings[1].Value);
            console.log("Country: ", response.data.Country);
            console.log("Language: ", response.data.Language);
            console.log("Plot: ", response.data.Plot);
            console.log("Actors: ", response.data.Actors);
            
            console.log("----------------------------"); */

            

            fs.readFile("log.txt", "utf8", function(err, data) {
                // If there's an error reading the file, we log it and return immediately
                if (err) {
                  return console.log(err);
                }
                console.log("\n----------------------------");

                fs.appendFileSync("log.txt", "----------------------------\n");
                fs.appendFileSync("log.txt", ("movie-this: " + searchTerm + " -> executed\n"));

                console.log("Title: ", response.data.Title);
                fs.appendFileSync("log.txt", ("Title: " + response.data.Title + "\n"));

                console.log("Year: ", response.data.Year);
                fs.appendFileSync("log.txt", ("Year: " + response.data.Year + "\n"));

                console.log("IMDB Rating: ", response.data.imdbRating);
                fs.appendFileSync("log.txt", ("IMDB Rating: " + response.data.imdbRating + "\n"));

                console.log("Rotten Tomatoes: ", response.data.Ratings[1].Value);
                fs.appendFileSync("log.txt", ("Rotten Tomatoes: " + response.data.Ratings[1].Value + "\n"));
                
                console.log("Country: ", response.data.Country);
                fs.appendFileSync("log.txt", ("Country: " + response.data.Country + "\n"));

                console.log("Language: ", response.data.Language);
                fs.appendFileSync("log.txt", ("Language: " + response.data.Language + "\n"));
                
                console.log("Plot: ", response.data.Plot);
                fs.appendFileSync("log.txt", ("Plot: " + response.data.Plot + "\n"));

                console.log("Actors: ", response.data.Actors);
                fs.appendFileSync("log.txt", ("Actors: " + response.data.Actors + "\n"));

                fs.appendFileSync("log.txt", "----------------------------\n");
                
                console.log("----------------------------");
            });                       
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


// Helper function that gets the artist name
var getArtistNames = function(artist) {
    return artist.name;
  };













