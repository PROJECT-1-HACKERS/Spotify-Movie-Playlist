// 
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

        // Parses web page to readable HTML
        body = '<div id="body-mock">' + result.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';
        var $body = $(body);
        var b1 = $body[0].closest("#body-mock", "#wrapper")

        console.log(b1)
        // console.log($body[0].find())
      }
    })

  })
}

// passing thru John Wick to test responses.
imdbAjax("John Wick")