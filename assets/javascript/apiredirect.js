// I can't remember why I had to use a different URL here. Spotify's whole auth process was pretty bizarre
// It returned the token + other things after a #, so you had to use window.location.hash and some other stuff
var newURL = new URL('http://www.google.com/?'+window.location.hash.substr(1));

var token = newURL.searchParams.get("access_token");
var tokenExpiry = newURL.searchParams.get("expires_in");

// Shove the stuff into localStorage. sessionStorage wouldn't work here because again, weirdly this has to be done on a separate page
// Firebase probably would have worked just as well though.
localStorage.setItem("spotifyAPItoken", token);
localStorage.setItem("spotifyExpiresIn", tokenExpiry);
window.close();
