
thisWindow = window.location.href
window.open(`https://accounts.spotify.com/authorize?client_id=0bfbe170f82c46a089b7d9d412592492&redirect_uri=${thisWindow}&response_type=code`);
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
