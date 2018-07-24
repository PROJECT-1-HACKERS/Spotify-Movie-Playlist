let userId, movieVal;

function movieInputClick(callback) {
  let moVal = $("#movieInput").val().trim();
  movieVal = moVal;
  let movie = callback(new Movie(moVal));
}

let spotifyTrackIdList = [];
$("#movieInputSubmit").click(function() {

  getUserId((x) => userId = x);
  movieInputClick(
    (data) => {
      setTimeout(function() {
        let playlistId;
        $("#soundTrackList").empty();

        let trackNames = data.trackInfo.map((x) => x.trackName);
        trackNames.map((eachName, index) => $("#soundTrackList").append(`<li class='list-group-item'>${index+1}: ${eachName}</li>`));
// ====================================================================================
// Create one new playlist
        $.ajax({
          method: "POST",
          url: `https://api.spotify.com/v1/users/${userId}/playlists`,
          headers: {
            "Authorization": "Bearer "  + localStorage.getItem('spotifyAPItoken'),
            "Content-Type": "application/json"
          },
          data: JSON.stringify({name: `${movieVal} soundtrack playlist`})
        }).then(function(newPlaylist) {
          playlistId = newPlaylist.id
        })
// ====================================================================================
// Map over trackNames array, search and grab the first song, then add it to playlist.
        let playlistButton = $("<button class='btn btn-warning'>");
        playlistButton.text("Create Spotify Playlist");
        playlistButton.click(function() {
          console.log(trackNames);
          let pushUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?uris=`
          for (var i = 0; i < trackNames.length; i++) {
            $.ajax({
              method: "GET",
              url: "https://api.spotify.com/v1/search",
              headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('spotifyAPItoken')
              },
              data: {
                "q": trackNames[i],
                "type": "track",
                "limit": "1"
              },
            }).then(function(response) {
              let trackId = response.tracks.items[0].id;
              if (i == trackNames.length-1) {
                pushUrl = pushUrl+ "spotify%3Atrack%3A"+trackId;
              } else {
                pushUrl = pushUrl+ "spotify%3Atrack%3A"+trackId+",";
              }
            })
          }
          setTimeout(function() {
            console.log(pushUrl)
            $.ajax({
            method: "POST",
            url: pushUrl,
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('spotifyAPItoken'),
              "Content-Type": "application/json"
            }
          })}, 500)
        })
        $("#createPlaylistButton").append(playlistButton);
      }, 900)
    })
})





// function() {
//   let songList = x.trackInfo.map((y) => y.trackName)
//   songIdGet(songList, (x) => {
//     spotifyTrackIdList = x.map((y) => {return y.tracks.items[0].id})
//     console.log(spotifyTrackIdList)
//   }
