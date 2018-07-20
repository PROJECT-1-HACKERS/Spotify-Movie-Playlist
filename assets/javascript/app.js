function imdbAjax(name){
  var queryURL = "http://www.omdbapi.com/?t=" + name + "&apikey=76978dc"

  $.ajax( {
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(response.imdbID);
    $.ajax( {
      url: `https://cors.io/?https://www.imdb.com/title/${response.imdbID}/soundtrack`,
      method: "GET",
      crossDomain: true,
      dataType: "html",
      success: function(result) {
        console.log(result);
      }
    })

  })
}
