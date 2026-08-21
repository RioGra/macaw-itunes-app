import { useState } from "react";
import searchItunes from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ResultsGrid from "./components/ResultsGrid";
import FavouritesDrawer from "./components/FavouritesDrawer";

// Main App component
function App() {
	const [results, setResults] = useState([]); // search results - starts empty
	const [favourites, setFavourites] = useState([]); // saved favourites - starts empty
	const [loading, setLoading] = useState(false); // is a search in progress?
	const [error, setError] = useState(null); // did something go wrong during search ?
	const [showDrawer, setShowDrawer] = useState(false); // is the favourites drawer open?

	// Function to handle search requests to the iTunes API
	const handleSearch = async (term, media) => {
		setLoading(true);
		setError(null);
		try {
			const data = await searchItunes(term, media);
			setResults(data);
		} catch (error) {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Function to add an item to favourites, preventing duplicates
	const addFavourite = (item) => {
		//prevent duplicates
		if (!favourites.some((fav) => fav.trackId === item.trackId)) {
			setFavourites([...favourites, item]);
		}
	};
	// Function to remove an item from favourites
	const removeFavourite = (trackId) => {
		setFavourites(favourites.filter((fav) => fav.trackId !== trackId));
	};
	// Render the main App component
	return (
		<div>
			<NavBar
				favouriteCount={favourites.length}
				onToggleDrawer={() => setShowDrawer(true)}
			/>
			<SearchBar onSearch={handleSearch} />
			<ResultsGrid
				results={results}
				loading={loading}
				onAddFavourite={addFavourite}
				favourites={favourites}
			/>
			<FavouritesDrawer
				favourites={favourites}
				onRemoveFavourite={removeFavourite}
				show={showDrawer}
				onClose={() => setShowDrawer(false)}
			/>
		</div>
	);
}

export default App;
