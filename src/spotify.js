// authEndpoint is the URL to authenticate using Spotify
export const authEndpoint = "https://accounts.spotify.com/authorize";
// redirectURI states where to take back the user if Spotify login was successful
const redirectUri = "http://localhost:3000/";

// ClientID provided by Spotify Web API
const clientId = "64ce1307f9d74611a23d1ecd0ade1549";

// permissions which we ask Spotify for
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    }, {});
}

// Final URL to be called in order to authorize an user for the Spotify clone app.
// Contains ClientID and permissions so Spotify knows our app allows user authentication
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;