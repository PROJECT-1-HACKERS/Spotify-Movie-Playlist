async function omdbAjax(name) {
  const result = $.ajax( {
      url: `https://www.omdbapi.com/?t=${name}&apikey=76978dc&plot=full`,
      method: "GET"
  })
  return result
}

async function imdbScraper(name) {
  let data = await omdbAjax(name);
  const result = $.ajax({
    url: `https://cors.io/?https://www.imdb.com/title/${data.imdbID}/soundtrack`,
    method: "GET",
    crossDomain: true,
    dataType: "html"
  })
  return result;
}

async function parseimdbAjax(name) {
      // Wait or result to finish, it becomes a gigantic string of the entire source page of imdbID/soundtrack
      let result = await imdbScraper(name)
      // Regex search / replace to remove everything except what is inside the body tags, that way jQuery can use it
      body = '<div id="body-mock">' + result.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/ig, '') + '</div>';


      // =========================================================================================================
      // This checks a specific spot in some of these soundtrack pages, for a huge piece of json that has all the data we need, in a specific react script tag Some have it, some don't.
      // This will increase our accuracy, webscraping is hard because we are at the whims of the host-site gods, and however they decided to format that particular page
      // Sometimes there is a huge script at the bottom of the page that has some react stuff -- parse it with RegEx to get the json object inside of it
      let returnData = [];
      if ($(body).find('script:contains("trackIds")').text().includes(',')) {
        let scriptJson = $(body).find('script:contains("trackIds")').text();
        scriptJson = scriptJson.replace(/.+?(?=\{"albumOpenS)/, '["center-1-react",');
        scriptJson = scriptJson.replace(/Samples\"\}\].*/, 'Samples"}]');
        let jsonObj = JSON.parse(scriptJson);
        for (key in jsonObj[1].albumData.tracks) {
          returnData.push({"isTrue": true, "trackName": jsonObj[1].albumData.tracks[key].trackTitle, "artist": jsonObj[1].albumData.tracks[key].artists});
        }
      }
      // Otherwise, grab the data from the older IMDB style, "soundtracks_content" div. Thankfully they're consistent enough
      // =========================================================================================================
      else{
        var $body = $("#soundtracks_content", body).children().children();
        for (var i = 0; i < $body.length; i++) {
          // logs song title
          returnData.push({"isTrue": false, "trackName": Array.from($($body[i]).contents())[0].data, "artist": Array.from($($body[i]).contents().closest('a:first-of-type').text()).join("")});
        }
      }
      return returnData;
    }
