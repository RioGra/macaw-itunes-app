import axios from "axios";

const API_URL = "https://macaw-server.onrender.com";

// Fetch JWT token from server
const getToken = async () => {
	//fetches a fresh JWT token before every search
	const response = await axios.post(`${API_URL}/api/token`);
	return response.data.token;
};

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
