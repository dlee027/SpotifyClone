import React, {useEffect, useState} from "react";
import "./App.css";
import Login from "./Login";
import {getTokenFromUrl} from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import {useDataLayerValue} from "./DataLayer";

// this object represents the SpotifyWebApi
const spotify = new SpotifyWebApi();

function App() {
    const [token, setToken] = useState();
    const [{user}, dispatch] = useDataLayerValue();


    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash="";
      const _token = hash.access_token;

      // if token exists, setting Access Token to the Spotify Access Token
      // so it can access Spotify Services
      if (_token) {
        setToken(_token);
        spotify.setAccessToken(_token);
        spotify.getMe().then((user) => {

          dispatch({
            type: 'SET_USER',
            user: user,
          });
        });
      }

      console.log("token", token);
    }, [dispatch,token]);
    
    console.log(user);

    return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
