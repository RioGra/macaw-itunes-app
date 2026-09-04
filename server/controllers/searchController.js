import axios from "axios";

// Call iTunes API with axios, map response fields to required fields
const searchItunes = async (req, res) => {
	const { term, media = "all", limit = 25, country = "US" } = req.query;
	if (!term) {
		return res.status(400).json({ message: "Search term is required" });
	}

	try {
		// Call the iTunes API with the search term, media type, and limit
		const response = await axios.get("https://itunes.apple.com/search", {
			params: { term, media, limit, country },
		});

		// Map only fields we need from the iTunes API response
		const results = response.data.results.map((item) => ({
			trackName: item.trackName,
			albumName: item.collectionName,
			artistName: item.artistName,
			albumCover: item.artworkUrl100?.replace("100x100", "600x600"),
			releaseDate: item.releaseDate,

			// iTunes API returns different types of media (music, movies, etc.),
			// so need to handle both trackId for songs and collectionId for albums
			// Use trackId if available, otherwise use collectionId
			trackId: item.trackId || item.collectionId,
			previewUrl: item.previewUrl || null,
		}));

		// Send the mapped results back to the client
		res.json({ resultCount: results.length, results });
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch data from iTunes API" });
	}
};

export default searchItunes;
