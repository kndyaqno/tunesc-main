const client_id = "dc26e4f1b1e646f99f6fe1f0f658c64d";
const client_secret = "28328790fd314f768178c20795542397";
const redirect_uri = "http://127.0.0.1:5500/tunesc-vs/pages/UserProfile.html";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const scopes =
  "user-read-private user-read-email playlist-modify-public playlist-modify-public ugc-image-upload";

//gets token sa urlbar
const urlParams = new URLSearchParams(window.location.hash.substr(1));
const access_token = urlParams.get("access_token");

function authorizeSpot() {
  let url = AUTHORIZE;
  url += "?response_type=token";
  url += "&client_id=" + client_id;
  url += "&scope=" + scopes;
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  //   url += "&state=" + encodeURIComponent(state);
  url += "&show_dialog=true";
  window.location.href = url;
}
