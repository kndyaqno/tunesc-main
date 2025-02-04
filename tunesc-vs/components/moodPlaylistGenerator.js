function initializeApp() {
  // Extract the access token from the URL
  getAccessTokenFromUrl();

  // Add event listeners or other initialization logic here
  const moodForm = document.getElementById('moodForm');
  moodForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedMood = document.getElementById('moodDropdown').value;
    generatePlaylistForMood(selectedMood);
  });
}


// Initialize the application when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const moodForm = document.getElementById('moodForm');
  
  // Call the function from spot.js to ensure the access token is retrieved from the URL
  if (typeof getAccessTokenFromUrl === "function") { 
    getAccessTokenFromUrl();
  }

  moodForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedMood = document.getElementById('moodDropdown').value;
    generatePlaylistForMood(selectedMood);
  });
});

function fetchSpotifyUserID() {
  // The access token is used here to fetch the Spotify user ID
  return fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${window.access_token}`
    }
  })
  .then(response => response.json())
  .then(data => data.id);
}

function mapMoodToAttributes(mood) {
  // Maps the selected mood to track attributes used in the Spotify API
  const attributes = {
    valence: 0.5, // Default valence
    energy: 0.5,  // Default energy
  };

  switch (mood) {
    case 'Happy':
      attributes.valence = 0.8;
      attributes.energy = 0.8;
      break;
    case 'Sad':
      attributes.valence = 0.2;
      attributes.energy = 0.3;
      break;
    case 'Energetic':
      attributes.valence = 0.7;
      attributes.energy = 0.9;
      break;
    case 'Calm':
      attributes.valence = 0.5;
      attributes.energy = 0.2;
      break;
    case 'Rage':
      attributes.valence = 0.2;
      attributes.energy = 0.8;
      break;
    // Add more cases for other moods as needed
  }

  return attributes;
}


function fetchTracksWithAttributes(attributes) {
  // Fetch tracks from Spotify based on the attributes associated with the selected mood
  return fetch(`https://api.spotify.com/v1/recommendations?seed_genres=pop&target_valence=${attributes.valence}&target_energy=${attributes.energy}`, {
    headers: {
      'Authorization': `Bearer ${window.access_token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.tracks; // Return the full track objects
  });
}

function generatePlaylistForMood(mood) {
  fetchSpotifyUserID().then(userId => {
    const attributes = mapMoodToAttributes(mood);
    fetchTracksWithAttributes(attributes).then(tracks => {
      if (tracks.length > 0) {
        displayTracksAsText(tracks);
        createPlaylist(userId, 'Discover TuneSculpt')
          .then(playlistId => {
            showListenOnSpotifyButton(playlistId);
          });
      } else {
        alert('No tracks found for this mood. Please try a different mood.');
      }
    }).catch(error => {
      console.error('Error fetching tracks:', error);
      alert('An error occurred while generating the playlist.');
    });
  }).catch(error => {
    console.error('Error fetching user ID:', error);
  });
}

function displayTracksAsText(tracks) {
  const trackListContainer = document.getElementById('trackListContainer'); // Make sure this exists in your HTML
  trackListContainer.innerHTML = ''; // Clear existing track list

  tracks.forEach(track => {
    const trackElement = document.createElement('p');
    trackElement.textContent = `Track: ${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
    trackListContainer.appendChild(trackElement);
  });
}

function showListenOnSpotifyButton(playlistId) {
  const listenBtn = document.getElementById('listenOnSpotifyBtn');
  if (listenBtn) {
      listenBtn.style.display = 'inline-block'; // Show the button
      listenBtn.href = `https://open.spotify.com/playlist/${playlistId}`; // Set the correct Spotify URL
  }
}


function createOrUpdatePlaylist(userId, trackUris) {
  // Create a new playlist and add the tracks to it
  // ...
}

function createPlaylist(userId) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${window.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'New Playlist',
      public: false // Change to true if you want the playlist to be public
    })
  })
  .then(response => {
    if (response.status === 403) {
      console.error('Access forbidden. Check access token and permissions.');
      // Handle forbidden error (e.g., try to refresh the access token)
    } else if (!response.ok) {
      throw new Error(`Server response status code: ${response.status}`);
    }
    return response.json();
  })
  .then(playlistData => {
    console.log('Playlist created:', playlistData);
    return playlistData.id; // Use this ID to add tracks or link to the playlist
  })
  .catch(error => {
    console.error('Error creating playlist:', error);
  });
}



