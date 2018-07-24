// let userId, movieVal;
//
// function movieInputClick(callback) {
//   let moVal = $("#movieInput").val().trim();
//   movieVal = moVal;
//   let movie = callback(new Movie(moVal));
// }

$("#movieInputSubmit").click(async function() {
  let movieName = $("#movieInput").val().trim();
  let spotifyUserId = await getUserId();
  spotifyUserId = spotifyUserId.id;
  let omdbData = await omdbAjax(movieName);
  let imdbSoundtrackData = await parseimdbAjax(movieName);
  // ====================================================================================
  $("#soundTrackList").empty();
  imdbSoundtrackData.map((data, index) => $("#soundTrackList").append(`<li class='list-group-item'>${index+1}: ${data.trackName}</li>`))
  let playlistButton = $("<button class='btn btn-warning'>");
  playlistButton.text("Create Spotify Playlist");
  playlistButton.click(async function() {
    let playlistId = await createSpotifyPlaylist(movieName);
    playlistId = playlistId.id;

    let pushUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists/${playlistId}/tracks?uris=`
    const searchResults = await Promise.all(imdbSoundtrackData.map(async function(songName, i, arr) {
      let trackUrl = await spotifyTrackSearch(songName.trackName);
      trackUrl = trackUrl.tracks.items[0].id
      if (i == arr.length-1) {
        pushUrl = pushUrl+ "spotify%3Atrack%3A"+trackUrl;
      } else {
        pushUrl = pushUrl+ "spotify%3Atrack%3A"+trackUrl+",";
      }
    }));
    spotifyPostToPlaylist(pushUrl);
  })
  $("#createPlaylistButton").append(playlistButton);
})
