var newURL = new URL(window.location.href);

var code = newURL.searchParams.get("code")

localStorage.setItem("spotifyAPIcode", code)
window.close();
