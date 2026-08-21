import { useState } from "react";

//Display a single media card with add/remove favourite button
function MediaCard({ item, onAddFavourite, isFavourite }) {
	return (
		<div className="card h-100">
			{/* Album cover image */}
			<img
				src={item.albumCover}
				alt={item.albumName}
				className="card-img-top"
			/>

			<div className="card-body d-flex flex-column">
				{/* Track and album info */}
				<h6 className="card-title">{item.trackName || item.albumName}</h6>
				<p className="card-text text-muted mb-1">{item.artistName}</p>
				<p className="card-text text-muted mb-1">{item.albumName}</p>
				<p className="card-text small text-muted">
					{item.releaseDate ? new Date(item.releaseDate).getFullYear() : ""}
				</p>

				{/* Add to favourite button */}
				<button
					className={`btn mt-auto ${isFavourite ? "btn-danger" : "btn-outline-danger"}`}
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
