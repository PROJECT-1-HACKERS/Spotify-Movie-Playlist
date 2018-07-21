// Function to retrieve soundtrack info from inputed movie

// NOTE: EXAMPLE USAGE: imdbAjax("John Wick", (x) => test.push(x))

function imdbAjax(name, callback){
  // Creating var for OMDb API
  var queryURL = "http://www.omdbapi.com/?t=" + name + "&apikey=76978dc"

  // Gets info from OMDb
  $.ajax( {
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    // console.log(response);
  // }

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
      // var $body = $("#soundtracks_content", body).children().children();

      var $body = $("#soundtracks_content", body).children().children();
      console.log($body)

      for (var i = 0; i < $body.length; i++) {
        // logs song title
        callback({"trackName": Array.from($($body[i]).contents())[0].data.trim(), "artist": Array.from($($body[i]).contents().closest('a:last-of-type').text()).join("")});
      }
    })
  })
}

class OMDBInfo {
  constructor(name) {
    let _this = this
    // Creating var for OMDb API
    var queryURL = "http://www.omdbapi.com/?t=" + name + "&apikey=76978dc"
    // Gets info from OMDb
    $.ajax( {
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      _this.response = response;
    })
  }
}

class Movie {
  constructor(arg) {
    this.trackInfo = [];
    imdbAjax(arg, (track) => this.trackInfo.push(track));
    this.movieData = new OMDBInfo(arg);
  }
}


// For testing application
var test = []
imdbAjax("Blade Runner", (x) => test.push(x))