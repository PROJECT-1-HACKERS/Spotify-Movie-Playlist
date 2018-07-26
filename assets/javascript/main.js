
$("#movieInputSubmit").click(async function() {
  let movieName = $("#movieInput").val().trim();
  let spotifyUserId = await getUserId();
  spotifyUserId = spotifyUserId.id;
  let omdbData = await omdbAjax(movieName);
  let imdbSoundtrackData = await parseimdbAjax(movieName);
  $("#soundTrackList").empty();
  $("#createPlaylistButton").empty();
  imdbSoundtrackData.map((data, index) => $("#soundTrackList").append(`<li class='list-group-item'>${index+1}: ${data.trackName}</li>`))
  // ====================================================================================
  console.log(omdbData); // this will be the typical OMDB response you're used to
  $("#movieName").text(`${omdbData.Title} (${omdbData.Year})`)
  $("#moviePoster").html(`<img id="moviePoster" src=${omdbData.Poster} class="card-img-top" alt="Card image cap">`)
  $("#movieInfo").html(`
    <li class="list-group-item"><strong>Rating</strong>: ${omdbData.Rated}</li>
    <li class="list-group-item"><strong>Starring</strong>: ${omdbData.Actors}</li>
    <li class="list-group-item"><strong>Plot</strong>: ${omdbData.Plot}</li>
    <li class="list-group-item"><strong>Awards</strong>: ${omdbData.Awards}</li>
    `)
  // ====================================================================================
  // playlistButton's on click function becomes a combination of a lot of the async funcs created earlier
  let playlistButton = $("<button class='btn btn-warning'>");
  playlistButton.text("Create Spotify Playlist");
  playlistButton.click(async function() {
    let playlistId = await createSpotifyPlaylist(movieName);
    playlistId = playlistId.id;
    let pushUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists/${playlistId}/tracks?uris=`
    const searchResults = await Promise.all(imdbSoundtrackData.map(async function(songName, i, arr) {
      let trackUrl = await spotifyTrackSearch(songName.trackName);
      if (trackUrl.tracks.items.length > 0) {
        pushUrl += "spotify%3Atrack%3A"+trackUrl.tracks.items[0].id+",";
      }
      }));
    pushUrl.slice(0, -1);
    spotifyPostToPlaylist(pushUrl);
  })
  // ====================================================================================
  $("#createPlaylistButton").append(playlistButton);
})
