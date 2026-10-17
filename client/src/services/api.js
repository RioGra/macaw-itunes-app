import axios from "axios";

const API_URL = "http://localhost:5001";

//TODO switch back to after updating changes "https://macaw-server.onrender.com";

// Cache for JWT token - In memory token cache, reused between searches
let cachedToken = null;
let tokenExpiresAt = 0;
// Refresh the token 60 seconds before it expires
const TOKEN_REFRESH_BUFFER_MS = 60 * 1000;
// Fetch JWT token from server
const getToken = async () => {
	//Reuse the cached token, or fetch a new one if missing or expired
	if (cachedToken && Date.now() < tokenExpiresAt - TOKEN_REFRESH_BUFFER_MS) {
		return cachedToken;
	}
	const response = await axios.post(`${API_URL}/api/token`);
	cachedToken = response.data.token;
	tokenExpiresAt = Date.now() + response.data.expiresIn * 1000;
	return cachedToken;
};
// Make Search Requests to iTunes API via Express server
const makeSearchRequest = async (term, media, token) => {
	const response = await axios.get(`${API_URL}/api/itunes/search`, {
		params: { term, media },
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data.results;
};

//Search iTunes API via Express server (only function that
// components need to call) React automatically sends the JWT
const searchItunes = async (term, media = "all") => {
	try {
		const token = await getToken();
		return await makeSearchRequest(term, media, token);
	} catch (error) {
		//Token expired:  clear the cache, get a new token and retry once
		if (error.response?.data?.code === "TOKEN_EXPIRED") {
			cachedToken = null;
			tokenExpiresAt = 0;
			const newToken = await getToken();
			return await makeSearchRequest(term, media, newToken);
		}

		throw error;
	}
};

export default searchItunes;
