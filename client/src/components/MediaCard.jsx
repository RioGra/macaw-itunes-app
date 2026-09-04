// Display a single media card with add/remove favourite button
function MediaCard({ item, onAddFavourite, isFavourite, onPlay }) {
	return (
		<div className="card h-100">
			{/* Album cover image */}
			<img
				src={item.albumCover}
				alt={item.albumName || item.artistName || "Album artwork"}
				className="card-img-top"
			/>
			{/* Media Card Preview play button — only shown if preview is available */}
			{item.previewUrl && (
				<div
					className="media-card-preview-btn"
					onClick={() => onPlay(item)}
				>
					<i className="bi bi-play-circle-fill"></i>
					<span>Preview</span>
				</div>
			)}
			<div className="card-body d-flex flex-column">
				{/* Track and album info */}
				<p className="card-artist">{item.artistName}</p>
				<h6 className="card-title">{item.trackName || item.albumName}</h6>
				<p className="card-album">{item.albumName}</p>
				<p className="card-year">
					{item.releaseDate ? new Date(item.releaseDate).getFullYear() : ""}
				</p>

				{/* Add to favourite button */}
				<button
					className={`btn mt-auto btn-fav ${isFavourite ? "active" : ""}`}
					onClick={() => onAddFavourite(item)}
				>
					<i className={`bi ${isFavourite ? "bi-heart-fill" : "bi-heart"}`}></i>
					{isFavourite ? "Added" : "Add to Favourites"}
				</button>
			</div>
		</div>
	);
}

export default MediaCard;
