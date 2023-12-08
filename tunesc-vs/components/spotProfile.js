function getUserProfile() {
  console.log("Fetching user profile...");

  // Check if the access token is present and not expired
  if (!window.access_token || isTokenExpired()) {
    console.log("Access token is missing or expired. Refreshing token...");

    // Implement your token refresh logic here
    refreshAccessToken()
      .then((newAccessToken) => {
        // Update the access token
        window.access_token = newAccessToken;

  
        fetchUserProfile();
      })
      .catch((error) => {
        console.error("Error refreshing access token:", error.message);
      });
  } else {
 
    fetchUserProfile();
  }
}

function fetchUserProfile() {
  // Fetch user profile
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + window.access_token,
    },
  })
    .then((response) => {
      console.log("Response received from Spotify API:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log("User profile data:", data);

      // Update the HTML element with the user profile picture
      const profilePicture = document.getElementById("spot_picture");

   
      if (data.images && data.images.length > 0) {
        profilePicture.src = data.images[0].url;
        console.log("Profile picture URL:", data.images[0].url);
      } else {
      
        profilePicture.src = "path_to_default_image.jpg";
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error.message);
    });
}
