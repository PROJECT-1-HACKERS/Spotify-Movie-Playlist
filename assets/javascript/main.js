let userID;

function movieInputClick(callback) {
  let moVal = $("#movieInput").val().trim();
  let movie = callback(new Movie(moVal));
}

let spotifyTrackIdList = [];
$("#movieInputSubmit").click(function() {
  spotifyTrackIdList = [];
  getUserId((x) => userID = x);
  movieInputClick(
    (data) => {
      setTimeout(function() {
        $("#soundTrackList").empty();
        let trackNames = data.trackInfo.map((x) => x.trackName);
        console.log(trackNames)
        trackNames.map((eachName) => $("#soundTrackList").append(`<li class='list-group-item'>${eachName}</li>`));
        songIdGet(trackNames, (ajaxResponse) => {
          for (var i = 0; i < ajaxResponse.length; i++) {
            // console.log(ajaxResponse[i].tracks.items[0].id)
            spotifyTrackIdList.push(ajaxResponse[i].tracks.items[0].id)
          }
        });
      }, 900)
    })
})





// function() {
//   let songList = x.trackInfo.map((y) => y.trackName)
//   songIdGet(songList, (x) => {
//     spotifyTrackIdList = x.map((y) => {return y.tracks.items[0].id})
//     console.log(spotifyTrackIdList)
//   }
