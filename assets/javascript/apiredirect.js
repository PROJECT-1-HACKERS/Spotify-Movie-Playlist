var newURL = new URL('http://www.google.com/?'+window.location.hash.substr(1));

var token = newURL.searchParams.get("access_token");
token = "BQDpqNjjLiIhJ9I8Rk_M_jC9vtyZH5B_qrvCssp03c87e-9a-vcx0SAJZ_s2ivIrC0ZH6DKlRB_M4tcJoEK-6g8RD3WAhqh74rYMp8oKV6v-XtTZ0NQ27Tsvdc7ank-KeO6hhxzC-7X1h5awC9B2uCUbFbwfagRGKPCX5YWvoIOu9FCGNslD3JpDjePVeAt9YuUdrplAUf42Yp8f8u_T7ymhfLoNAw";
var tokenExpiry = newURL.searchParams.get("expires_in");

localStorage.setItem("spotifyAPItoken", token);
localStorage.setItem("spotifyExpiresIn", tokenExpiry);
window.close();
