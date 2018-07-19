var newURL = new URL(window.location.href);

var token = newURL.searchParams.get("#access_token");
var tokenExpiry = newURL.searchParams.get("expires_in");

localStorage.setItem("spotifyAPItoken", token);
localStorage.setItem("spotifyExpiresIn", tokenExpiry);
window.close();


// // http://127.0.0.1:8080/apiredirect.html#
// access_token=BQDaRR_fmhb5JRkTZl8W4ZSZHIChVB3ca2NkTL5XBvn44UvdRGji8kcdk0E06k5QWNV1KadORgCCj56xjmppnIwdbje-7XS4SnfGrymzxervUQUxTmtdfoYqTOEXkqJFkgOxvjqD4T8&
// token_type=Bearer&e
// xpires_in=3600
