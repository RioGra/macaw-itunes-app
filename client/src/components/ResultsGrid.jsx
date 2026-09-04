import MediaCard from "./MediaCard";

// Displays results grid, loading state, and empty state
function ResultsGrid({
	results,
	loading,
	onAddFavourite,
	favourites,
	hasSearched,
	onPlay,
}) {
	// Show skeleton cards while API call is in progress
	if (loading)
		return (
			<div className="container mt-4">
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
					{[...Array(8)].map((_, i) => (
						<div
							className="col"
							key={i}
						>
							<div className="card h-100">
								<div className="skeleton skeleton-img"></div>
								<div className="card-body">
									<div className="skeleton skeleton-text"></div>
									<div className="skeleton skeleton-text short"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);

	if (results.length === 0 && !hasSearched)
		return (
			<p className="text-center empty-state">
				Discover Music, Movies, Podcasts,
				<br />
				Audiobooks and more...
			</p>
		);
	if (results.length === 0 && hasSearched)
		return (
			<p className="text-center empty-state">
				No results found - try a different search
			</p>
		);
	// Render results grid with MediaCard components
	return (
		<div className="container mt-4">
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
				{results.map((item) => (
					<div
						className="col"
						key={item.trackId}
					>
						<MediaCard
							item={item}
							onAddFavourite={onAddFavourite}
							isFavourite={favourites.some(
								(fav) => fav.trackId === item.trackId,
							)}
							onPlay={onPlay}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default ResultsGrid;
