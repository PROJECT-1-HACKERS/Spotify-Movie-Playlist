
function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=700,width=400');
       if (window.focus) {newwindow.focus()}
       return false;
}
let uriRedirectTest = "https://project-1-hackers.github.io/Project-1-BootCamp/apiredirect.html"
spotifyWindow = `https://accounts.spotify.com/authorize?client_id=0bfbe170f82c46a089b7d9d412592492&redirect_uri=${uriRedirectTest}/&response_type=code`

popitup(spotifyWindow, "test")
//
// $.ajax(
//   {
//     method: "GET",
//     url: "https://accounts.spotify.com/api/authorize",
//     data: {
//       "client_id":  "0bfbe170f82c46a089b7d9d412592492",
//       "response-type":  "token",
//       "redirect_uri":  "../../index.html",
//       "scope":  "user-read-private user-read-email"
//     },
//     success: function(result) {
//       console.log(result)
//     },
//   }
// );
