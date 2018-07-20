var newURL = new URL('http://www.google.com/?'+window.location.hash.substr(1));

var token = newURL.searchParams.get("access_token");
var tokenExpiry = newURL.searchParams.get("expires_in");

localStorage.setItem("spotifyAPItoken", token);
localStorage.setItem("spotifyExpiresIn", tokenExpiry);
window.close();
