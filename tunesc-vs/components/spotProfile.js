function getUserProfile(access_token) {
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the HTML elements with the user profile data
      document.getElementById("spot_name").textContent = data.display_name;
      document.getElementById("spot_email").textContent = data.email;
      document.getElementById("spot_followers").textContent =
        data.followers.total;
      document.getElementById("spot_picture").src = data.images[0].url;
      document.getElementById("spot_country").textContent = data.country;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getUserProfile(access_token);
