let accessToken = null;
const client_id = '2809822f6b7747cfb8b243c5226bae80';
const redirect_uri = 'http://localhost:3000';

const Spotify = {
  getAccessToken() {
    if (accessToken !== null) {
      return this.accessToken;
    }
    window.location.assign(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`);
  },
  search(searchTerm) {
    if (window.location.href.includes('access')) {
        const windowUrlSplit = window.location.href.indexOf('=');
        const nextWindowUrlSplit = window.location.href.substring(windowUrlSplit + 1);
        const thirdWindowUrlSplit = nextWindowUrlSplit.split('&');
        const token = thirdWindowUrlSplit[0];

        const response = fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
        }).then(jsonResponse => {
          if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }));
          }
        });
      } else {
        this.getAccessToken();
      }
  },
  savePlaylist(playlistName, trackUris) {
    if (!(playlistName && trackUris)) {
      return;
    }
    const token = this.accessToken;
    const headers = `Authorization: Bearer: ${accessToken}`;
    let userId = '';
    let playlistId = '';

    fetch(`https://api.spotify.com/v1/me, {headers: ${headers}}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(jsonResponse => {
        userId = jsonResponse.id;
      });

    fetch('https://api.spotify.com/v1/users/thelinmichael/playlists', {
      headers: {
        Authorization: `Bearer: ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(`{name:"${playlistName}", public:${false}`),
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(jsonResponse => {
      playlistId = jsonResponse.id;
    });

    const uris = trackUris.map(uri => {
      `"spotify:track:${uri}""`
    });
    // {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"]}

    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer: ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(`uris:${uris}`),
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(jsonResponse => {
      playlistId = jsonResponse.id;
    });
  }

};

export default Spotify;
