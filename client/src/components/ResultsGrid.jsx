import MediaCard from "./MediaCard";

//Displays results grid, loading state, and empty state
function ResultsGrid({ results, loading, onAddFavourite, favourites }) {
	if (loading) return <p className="text-center mt-4">Loading...</p>;

	if (results.length === 0)
		return (
			<p className="text-center mt-4">
				Search for music, movies, podcasts and more...
			</p>
		);

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
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default ResultsGrid;
