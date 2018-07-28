
$("#movieInputSubmit").click(async function() {
  let movieName = $("#movieInput").val().trim();
  // ====================================================================================
  // Kick off several of the async functions, wait for them to finish so we can use them further down
  let spotifyUserId = await getUserId();
  spotifyUserId = spotifyUserId.id;
  let omdbData = await omdbAjax(movieName);
  let imdbSoundtrackData = await parseimdbAjax(movieName);
  // ====================================================================================
  $("#soundTrackList").empty();
  $("#createPlaylistButton").empty();
  imdbSoundtrackData.map((data, index) => $("#soundTrackList").append(`<li class='list-group-item'>${index+1}: ${data.trackName}</li>`))
  $("#movieName").text(`${omdbData.Title} (${omdbData.Year})`)
  $("#moviePoster").html(`<img id="moviePoster" src=${omdbData.Poster} class="card-img-top" alt="Card image cap">`)
  $("#movieInfo").html(`
    <li class="list-group-item"><strong>Rating</strong>: ${omdbData.Rated}</li>
    <li class="list-group-item"><strong>Starring</strong>: ${omdbData.Actors}</li>
    <li class="list-group-item"><strong>Awards</strong>: ${omdbData.Awards}</li>
    `)
  $("#moviePlot").html(`
    <p><strong>Plot</strong>: ${omdbData.Plot}</p>
    `)
  $("#boxOffice").html(`
    <p><strong>Box-Office</strong>: ${omdbData.BoxOffice}</p>
    `)
    omdbData.Ratings.map(function(x, i) {
      $("#ratings").append(`<li class="list-group-item"><strong>${x.Source}</strong>: ${x.Value}</li>`)
    })
  // ====================================================================================
  // playlistButton's on click function becomes a combination of a lot of the async funcs created earlier
  let playlistButton = $("<button class='btn btn-warning'>");
  playlistButton.text("Create Spotify Playlist");
  playlistButton.click(async function() {
    // Creates a playlist
    let playlistId = await createSpotifyPlaylist(movieName);
    playlistId = playlistId.id;
    let pushUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists/${playlistId}/tracks?uris=`
    // Searches for all the songs in imdbSoundtrackData, builds the pushUrl
    // This is a more efficient version thanks to Cole's tips. This starts all of the searches at once with a for loop,
    // Then once they all come back, puts them into the correct format for the push to playlist url.
    // Before we had start one, finish it, then start the other. Inefficient that way
    let trackSearches = [];
    for (var i = 0; i < imdbSoundtrackData.length; i++) {
      trackSearches.push(spotifyTrackSearch(imdbSoundtrackData[i].trackName));
    }
    let promisedResults = await Promise.all(trackSearches);
    promisedResults = promisedResults.map(function(e, i) {
      if (e.tracks.items.length > 0) {
        return `spotify%3Atrack%3A${e.tracks.items[0].id}`;
      }
    })
    pushUrl += promisedResults
    //pushes the search results to your playlist in one go
    spotifyPostToPlaylist(pushUrl);
    $("#createPlaylistButton").append($("<p>Done! Check your spotify!!</p>"))
  })
  $("#createPlaylistButton").append(playlistButton);
})
