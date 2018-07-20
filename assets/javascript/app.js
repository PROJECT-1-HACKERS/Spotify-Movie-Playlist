// Function to retrieve soundtrack info from inputed movie
function imdbAjax(name){
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
      dataType: "html",
      success: function(result) {
        // console.log(result);

        // Parses web page to legible HTML
        body = '<div id="body-mock">' + result.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';

        // Target specific div needed
        var $body = $(body).find("#soundtracks_content").children().children();

        for (var i = 0; i < $body.length; i++) {
          // logs song title
          console.log($body[i].childNodes[0])

          // logs artist
          // Nodes are not exact so this will need a little work.
          console.log($body[i].childNodes[3])
        }
      }
    })

  })
}

// passing thru John Wick to test responses.
imdbAjax("John Wick")