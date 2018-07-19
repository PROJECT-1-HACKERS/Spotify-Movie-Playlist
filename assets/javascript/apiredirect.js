var currentURL = window.location.href

var newURL = new URL(currentURL);

var code = newURL.searchParams.get("code")

localStorage.setItem("spotifyAPIcode", code)
window.close();
