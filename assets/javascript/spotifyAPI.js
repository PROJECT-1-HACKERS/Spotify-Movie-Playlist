
function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=700,width=400');
       if (window.focus) {newwindow.focus()}
}
let uri_Redirect = ["http://127.0.0.1:8080/apiredirect.html"]
let scopes = "user-read-email user-read-private user-read-birthdate playlist-modify-public playlist-modify-private"
spotifyWindow = `http://accounts.spotify.com/authorize?client_id=0bfbe170f82c46a089b7d9d412592492&redirect_uri=${uri_Redirect[0]}&scope=${scopes}&response_type=token`


if (localStorage.getItem("spotifyAPItoken") === null) {
  let linkButton = $("<button class='btn btn-warning'>Log in to Spotify</button>");
  linkButton.click(() => {
    popitup(spotifyWindow, "spotifyAPIAuth");
    $("#apiWarningModal").modal('hide');
  });
  $("#spotifyLinker").append(linkButton);
  $("#apiWarningModal").modal();
}

// Function to get the user's key, since it's asyncrhonous is
// getUserId(function(output) {do thing with output}
async function getUserId() {
  const result = $.ajax({
    method: "GET",
    url: "https://api.spotify.com/v1/me",
    headers: {
      "Authorization": 'Bearer ' + localStorage.getItem('spotifyAPItoken'),
      "Accept": "application/json",
      "Content-type": "application/json"
    }
  })
  return result;
}
async function createSpotifyPlaylist(playlistName) {
  let userId = await getUserId()
  const result = $.ajax({
    method: "POST",
    url: `https://api.spotify.com/v1/users/${userId.id}/playlists`,
    headers: {
      "Authorization": "Bearer "  + localStorage.getItem('spotifyAPItoken'),
      "Content-Type": "application/json"
    },
    data: JSON.stringify({name: `${playlistName} soundtrack playlist`})
  })
  return result
}

async function spotifyTrackSearch(track) {
  const result = $.ajax({
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    headers: {
      "Authorization": 'Bearer ' + localStorage.getItem('spotifyAPItoken')
    },
    data: {
      "q": track,
      "type": "track",
      "limit": "1"
    }
  })
  return result
}

async function spotifyPostToPlaylist(pushUrl) {
  const result = $.ajax({
    method: "POST",
    url: pushUrl,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('spotifyAPItoken'),
      "Content-Type": "application/json"
    }
  })
  return result;
}
