# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Description
 
This node application helps a user search for various things.
* A user can search the Bands in Town Artist Events API for
an artist and render the information about each event to
the terminal.   
* A user can search the Spotify API for an artist and render
the information about the artist of the song.           
* A user can search the OMDB API for the movie and render  
information about the searched movie.                   
* A user can edit the `random.txt` to use it to call one of LIRI's commands.                  

## Getting Started

### Dependencies

* This node application uses command line tool (ex. git bash, termainal) to execute program.

### Installing

* Git Bash, Or Any types of Command Line Program

### Executing program

* Navigate in to the folder where `liri.js` is using command line program you choose.
    * If you want to search for the event of a artist
    1. node liri.js concert-this `artist/band name here`
    !['1a. concert-this example command'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/1a.-concert-this-example-command.PNG)
    2. It returns a information about the upcoming events
    !['1b.concert-this-return'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/1b.concert-this-return.PNG)
    
    * If you want to search for the related information of the song you like
    1. node liri.js spotify-this-song `song name here`  
    !['2a.spotifyThisExample'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/2a.spotifyThisExample.PNG)
    2. It returns a information about the song
    !['2b.spotifyReturns'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/2b.spotifyReturns.PNG)

    * If you want to search for the related information of the movie you like
    1. node liri.js movie-this `movie name here`
    !['3a.movieExample'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/3a.movieExample.PNG)
    2. It returns a information about the movie
    !['3b.movieReturns'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/3b.movieReturns.PNG)

    * If you want to search for the related information of the movie you like
    1. Need to change `random.txt` file in the format specified below
        * `spotify-this-song,"I Want it That Way"`
    2. node liri.js `do-what-it-says`
    !['4a'](https://github.com/HyeongUW/liri-node-app/blob/master/assets/images/4a.PNG)   
    3. The result will be the one of the above.




## Deployed Page:
* Not available for this program. 





## Authors
* Hyeong Suk Kim - whddkf2004@gmail.com





## License

* Used APIs
    * [Bands in Town API](https://manager.bandsintown.com/support/bandsintown-api)
    * [Spotify API](https://developer.spotify.com/documentation/web-api/)
    * [OMDB API](http://www.omdbapi.com/)


## Version History
 
* 0.1
    * Initial Release







                            
                                                        



                                             



<!-- 
### Page Examples:


* Landing page:
  ![landing-page](assets/images/wireframe_trend01.png)

* Search page:
  ![search-page](assets/images/wireframe_search01.png)

* Detail page:
  ![detail-page](assets/images/wireframe_detail01.png)

* Detail page:
  ![detail-page](assets/images/wireframe_detail02.png)

* Save list Modal:
  ![detail-page](assets/images/wireframe_savelist01.png)





## Enhancements

* list of possible enhancements
    1. improved detail page layout
    2. improved typography
    3. make Save List modal available on Search and Detail pages
    4. section with movie reviews (New York Time api)
    

 -->
