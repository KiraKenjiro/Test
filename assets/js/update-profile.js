// Function to update the profile information
function updateProfile(data) {
	// Check if the data object exists
	if (data && data.data) {
		const userData = data.data;

		// Update the profile picture
		const profilePicture = document.querySelector(".profile-picture img");
		profilePicture.src = userData.discord_user.avatar
			? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=512`
			: "default_profile_picture_url_here"; // Replace with a default image URL

		// Update the username
		// const usernameElement = document.querySelector(".username h2");
		// usernameElement.textContent = userData.discord_user.username;

		// Check if the user is listening to Spotify
		if (userData.listening_to_spotify && userData.spotify) {
			// Create and append the Spotify iframe
			const spotifyIframe = document.createElement("iframe");
			spotifyIframe.style.borderRadius = "12px";
			spotifyIframe.src = `https://open.spotify.com/embed/track/${userData.spotify.track_id}?utm_source=generator&theme=0`;
			spotifyIframe.width = "90%";
			spotifyIframe.height = "152";
			spotifyIframe.frameBorder = "0";
			spotifyIframe.allowFullscreen = "";
			spotifyIframe.allow =
				"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
			spotifyIframe.loading = "lazy";

			// Replace the custom status with the Spotify iframe
			const customStatusElement = document.querySelector(".username h3");
			const spotifyElement = document.querySelector(".spotify");
			customStatusElement.textContent = "Listening to spotify!"; // Clear the custom status text
			spotifyElement.appendChild(spotifyIframe);
		} else {
			// Update the custom status
			const customStatusElement = document.querySelector(".username h3");
			customStatusElement.textContent =
				userData.activities.find((activity) => activity.type === 4)
					?.state || "";
		}

		// Update the status-indicator class
		const statusIndicator = document.querySelector(".status-indicator");
		statusIndicator.classList.remove("online", "idle", "dnd", "offline"); // Remove existing classes
		statusIndicator.classList.add(userData.discord_status);
	}
}

// Get the user information using your API endpoint
const userid = "625393879075651584"; // Replace with the actual userid
fetch(`https://api.lanyard.rest/v1/users/${userid}`)
	.then((response) => response.json())
	.then((data) => updateProfile(data))
	.catch((error) => console.error("Error fetching user information:", error));
