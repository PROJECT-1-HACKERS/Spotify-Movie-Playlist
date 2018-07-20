
function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=700,width=400');
       if (window.focus) {newwindow.focus()}
}
let uri_Redirect = ["http://127.0.0.1:8080/apiredirect.html"]
let scopes = "user-read-email user-read-private user-read-birthdate"
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
function getUserId(handler) {
  $.ajax({
    method: "GET",
    url: "https://api.spotify.com/v1/me",
    headers: {
      "Authorization": 'Bearer ' + localStorage.getItem('spotifyAPItoken'),
      "Accept": "application/json",
      "Content-type": "application/json"
    }
  }).then(function(response) {
    handler(response.id);
  })
  return;
}


let songList = ["Legend Has It", "Eye of the Tiger", "Sabotage", "Call Ticketron", "Buddy Holly", "Particle Man"]
let spotifyList = [];

function songListMaker(arr, handler) {
  let promisesArr = [];
  arr.map((song, index) => {
    $.ajax({
        method: "GET",
        url: "https://api.spotify.com/v1/search",
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('spotifyAPItoken')
        },
        data: {
          "q": song,
          "type": "track",
          "limit": "1"
        },
      }
    ).then(function(promise) {
      promisesArr.push(promise);
      if(index == arr.length -1) {handler(promisesArr);}
    })
  })
}

// $("#apiSubmit").click(() => {$.ajax(
//   {
//     method: "GET",
//     url: "https://api.spotify.com/v1/search",
//     headers: {
//       "Authorization": 'Bearer ' + localStorage.getItem('spotifyAPItoken')
//     },
//     data: {
//       "q": $("#apiInputQuery").val().trim().toLowerCase(),
//       "type": $("#apiInputType").val().trim().toLowerCase()
//     },
//     success: function(result) {
//       console.log(result)
//     },
//   }
// )
// });
