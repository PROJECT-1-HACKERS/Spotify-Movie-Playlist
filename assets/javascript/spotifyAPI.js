
// ====================================================================================
// This is all spotify Authentication stuff.
function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=700,width=400');
       if (window.focus) {newwindow.focus()}
}
let uri_Redirect = ["http://127.0.0.1:8080/apiredirect.html"]
let scopes = "user-read-email user-read-private user-read-birthdate playlist-modify-public playlist-modify-private"
spotifyWindow = `http://accounts.spotify.com/authorize?client_id=0bfbe170f82c46a089b7d9d412592492&redirect_uri=${uri_Redirect[0]}&scope=${scopes}&response_type=token`


$("#spotifyLogin").click(
  function() {
    localStorage.clear();
    popitup(spotifyWindow, "spotifyAPIAuth");
  });


// ====================================================================================


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
  let result;

  try {result = $.ajax({
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
    return result;
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(e);
    }
  }
}

async function spotifyPostToPlaylist(pushUrl) {
  let result;

  try {result = $.ajax({
    method: "POST",
    url: pushUrl,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('spotifyAPItoken'),
      "Content-Type": "application/json"
    }
  })
    return result;
  } catch (e) {
    console.log(e);
  }
}
