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
        $("#soundTrackList").empty();
        let trackNames = data.trackInfo.map((x) => x.trackName);
        // console.log(trackNames)
        trackNames.map((eachName, index) => $("#soundTrackList").append(`<li class='list-group-item'>${index+1}: ${eachName}</li>`));
        songIdGet(trackNames, (ajaxResponse) => {
          for (var i = 0; i < ajaxResponse.length; i++) {
            // console.log(ajaxResponse[i].tracks.items[0].id)
            spotifyTrackIdList.push(ajaxResponse[i].tracks.items[0].id)
          }
        });
        let playlistButton = $("<button>");
        playlistButton.text("Create Spotify Playist");
        playlistButton.attr("class", "btn btn-outline-success");
        playlistButton.click(function() {
          console.log(spotifyTrackIdList)
          $.ajax({
            method: "POST",
            url: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: {
              "Authorization": "Bearer "  + localStorage.getItem('spotifyAPItoken'),
              "Content-Type": "application/json"
            },
            data: JSON.stringify({name: `${movieVal} soundtrack playlist`})
          }).then(function(newPlaylist) {
            let playlistId = newPlaylist.id;
            let dumbUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?uris=`
            for (var i = 0; i < spotifyTrackIdList.length; i++) {
              if(i == spotifyTrackIdList.length-1) {
                dumbUrl = dumbUrl+ "spotify%3Atrack%3A"+spotifyTrackIdList[i]

              }else {
                dumbUrl = dumbUrl+ "spotify%3Atrack%3A"+spotifyTrackIdList[i]+","
              }
            }
            $.ajax({
              method: "POST",
              url: dumbUrl,
              headers: {
                "Authorization": "Bearer " + localStorage.getItem('spotifyAPItoken'),
                "Content-Type": "application/json"
              }
            })
          })
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
