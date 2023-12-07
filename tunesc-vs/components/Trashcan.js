// function createOrUpdatePlaylist(userId, trackUris) {
//   // Create a new playlist and add the tracks to it
//   // ...
// }

// function createPlaylist(userId) {
//   const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${window.access_token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: 'New Playlist',
//       public: false // Change to true if you want the playlist to be public
//     })
//   })
//   .then(response => {
//     if (response.status === 403) {
//       console.error('Access forbidden. Check access token and permissions.');
//       // Handle forbidden error (e.g., try to refresh the access token)
//     } else if (!response.ok) {
//       throw new Error(`Server response status code: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(playlistData => {
//     console.log('Playlist created:', playlistData);
//     return playlistData.id; // Use this ID to add tracks or link to the playlist
//   })
//   .catch(error => {
//     console.error('Error creating playlist:', error);
//   });
// }

//------------------------------------------------------------------

// function createOrUpdatePlaylist(userId, trackUris) {
//   return createPlaylist(userId)
//     .then(playlistId => addTracksToPlaylist(userId, playlistId, trackUris))
//     .catch(error => {
//       console.error('Error creating or updating playlist:', error);
//     });
// }

// function createPlaylist(userId) {
//   const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${window.access_token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: 'New Playlist',
//       public: false // Change to true if you want the playlist to be public
//     })
//   })
//   .then(response => {
//     if (response.status === 403) {
//       console.error('Access forbidden. Check access token and permissions.');
//       // Handle forbidden error (e.g., try to refresh the access token)
//     } else if (!response.ok) {
//       throw new Error(`Server response status code: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(playlistData => {
//     console.log('Playlist created:', playlistData);
//     return playlistData.id; // Use this ID to add tracks or link to the playlist
//   });
// }

// function addTracksToPlaylist(userId, playlistId, trackUris) {
//   const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${window.access_token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       uris: trackUris
//     })
//   })
//   .then(response => {
//     if (response.status === 403) {
//       console.error('Access forbidden. Check access token and permissions.');
//       // Handle forbidden error (e.g., try to refresh the access token)
//     } else if (!response.ok) {
//       throw new Error(`Server response status code: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(trackData => {
//     console.log('Tracks added to playlist:', trackData);
//   });
// }

//---------------------------------------------------------------