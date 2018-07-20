johnWick = "john wick"

var queryURL = "http://www.omdbapi.com/?t=" + johnWick + "&apikey=76978dc"

$.ajax( {
    url: queryURL,
    method: "GET"
}).then(function(response) {
  var test = `https://www.imdb.com/title/${response.imdbID}/soundtrack`

  console.log(test)

})
