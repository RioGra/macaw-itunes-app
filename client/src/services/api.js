import axios from "axios";

const API_URL = "http://localhost:5001";

//TODO switch back to after updating changes "https://macaw-server.onrender.com";

// Cache for JWT token - In memory token cache, reused between searches
let cachedToken = null;
let tokenExpiresAt = 0;

// Fetch JWT token from server
const getToken = async () => {
	//Reuse the cached token, or fetch a new one if missing or expired
	if (cachedToken && tokenExpiresAt > Date.now()) {
		return cachedToken;
	}
	const response = await axios.post(`${API_URL}/api/token`);
	cachedToken = response.data.token;
	tokenExpiresAt = Date.now() + response.data.expiresIn * 1000;
	return cachedToken;
};
// Removed extra closing brace

//Search iTunes API via Express server (only function that
// components need to call) React automatically sends the JWT
const searchItunes = async (term, media = "all") => {
	const token = await getToken();
	const response = await axios.get(`${API_URL}/api/itunes/search`, {
		params: { term, media },
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data.results;
};

export default searchItunes;
