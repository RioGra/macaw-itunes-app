import { useEffect, useState } from "react";
import searchItunes from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ResultsGrid from "./components/ResultsGrid";
import FavouritesDrawer from "./components/FavouritesDrawer";
import FavouritesPanel from "./components/FavouritesPanel";
import AudioPlayer from "./components/AudioPlayer";
import Footer from "./components/Footer";

// Local storage key for favourites
const MACAW_FAVOURITES_KEY = "macaw-favourites";

// Main App component
function App() {
	const [results, setResults] = useState([]); // search results - starts empty
	// Load saved favourites from local storage on first render
	const [favourites, setFavourites] = useState(() => {
		try {
			const saved = localStorage.getItem(MACAW_FAVOURITES_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed)) {
					return parsed.filter((item) => item && item.trackId);
				}
			}
		} catch {
			// Corrupt or unreadable data- fall back to an empty list
		}
		return [];
	});

	// Save favourites to local storage whenever they change
	useEffect(() => {
		try {
			localStorage.setItem(MACAW_FAVOURITES_KEY, JSON.stringify(favourites));
		} catch {
			// Storage full or unavailable - ignore  so app doesn't crash
		}
	}, [favourites]);

	const [loading, setLoading] = useState(false); // is a search in progress?
	const [error, setError] = useState(null); // did something go wrong during search ?
	const [showDrawer, setShowDrawer] = useState(false); // is the favourites drawer open?
	const [hasSearched, setHasSearched] = useState(false); // has the user performed a search yet?
	const [currentTrack, setCurrentTrack] = useState(null); // currently playing track

	// Function to handle search requests to the iTunes API
	const handleSearch = async (term, media) => {
		setLoading(true);
		setError(null);
		try {
			const data = await searchItunes(term, media);
			setResults(data);
			setHasSearched(true);
		} catch (error) {
			if (error.response?.data?.code === "TOKEN_EXPIRED") {
				setError(
					"Your session has expired. Please search again to start a new session.",
				);
			} else {
				setError("Something went wrong. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	// Function to add an item to favourites, preventing duplicates
	const addFavourite = (item) => {
		// Prevent duplicates
		if (!favourites.some((fav) => fav.trackId === item.trackId)) {
			setFavourites([...favourites, item]);
		}
	};
	// Function to remove an item from favourites
	const removeFavourite = (trackId) => {
		setFavourites(favourites.filter((fav) => fav.trackId !== trackId));
	};

	// Sets the current track to play — clicking same track toggles play/pause
	const handlePlay = (track) => {
		setCurrentTrack(track);
	};

	// Render the main App component
	return (
		<div className="app-wrapper">
			<NavBar
				favouriteCount={favourites.length}
				onToggleDrawer={() => setShowDrawer(true)}
			/>
			<main className="app-main">
				<SearchBar onSearch={handleSearch} />
				{error && (
					<div className="error-state text-center">
						<i className="bi bi-exclamation-triangle-fill"></i> {error}
					</div>
				)}
				<div className="container-fluid px-3">
					<div className="row g-3 px-3">
						{/* Results grid — full width on mobile, 8 cols on desktop */}
						<div className="col-12 col-lg-8">
							<ResultsGrid
								results={results}
								loading={loading}
								onAddFavourite={addFavourite}
								favourites={favourites}
								hasSearched={hasSearched}
								onPlay={handlePlay}
							/>
						</div>
						{/* Favourites panel — desktop only */}
						<div className="col-lg-4 d-none d-lg-block">
							<FavouritesPanel
								favourites={favourites}
								onRemoveFavourite={removeFavourite}
								onPlay={handlePlay}
							/>
						</div>
					</div>
				</div>
				{/* Favourites drawer - mobile only */}
				<div className="d-lg-none">
					<FavouritesDrawer
						favourites={favourites}
						onRemoveFavourite={removeFavourite}
						show={showDrawer}
						onClose={() => setShowDrawer(false)}
						onPlay={handlePlay}
					/>
				</div>
			</main>
			{/* Show footer only when no track is playing */}
			{!currentTrack && <Footer />}
			{/* Fixed bottom audio player — renders when a track is selected */}.
			<AudioPlayer
				currentTrack={currentTrack}
				onClose={() => setCurrentTrack(null)}
			/>
		</div>
	);
}
export default App;
