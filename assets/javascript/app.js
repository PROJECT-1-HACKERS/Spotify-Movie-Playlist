// Function to retrieve soundtrack info from inputed movie
function imdbAjax(name, callback){
  // Creating var for OMDb API
  var queryURL = "http://www.omdbapi.com/?t=" + name + "&apikey=76978dc"

  // Gets info from OMDb
  $.ajax( {
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(response.imdbID);

    // Passes OMDb targeted response into cors.io to read specific web page
    $.ajax( {
      url: `https://cors.io/?https://www.imdb.com/title/${response.imdbID}/soundtrack`,
      method: "GET",
      crossDomain: true,
      dataType: "html"
    }).then(function(result) {
      // console.log(result);

      // Parses web page to legible HTML
      body = '<div id="body-mock">' + result.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';

      // Target specific div needed
      var $body = $("#soundtracks_content", body).children().children();

      for (var i = 0; i < $body.length; i++) {
        // logs song title
        callback(Array.from($($body[i]).contents())[0].data);
      }
    })
  })
}

// passing thru John Wick to test responses.
let test = [];
imdbAjax("John Wick", (x) => test.push(x))
