// DESKTOP-only: favourites side panel (visible on lg screens and above)

function FavouritesPanel({ favourites, onRemoveFavourite, onPlay }) {
	return (
		<div className="favourites-panel">
			{/* Panel header — heart icon and favourites count */}
			<p
				className="mb-4"
				style={{ fontWeight: "400" }}
			>
				<i
					className="bi bi-heart-fill me-2"
					style={{ color: "#FFD700" }}
				></i>
				Favourites<span className="ms-2">{favourites.length}</span>
			</p>

			{/* Render empty state or list of favourites */}
			{favourites.length === 0 ? (
				<p
					className="text-center empty-state"
					style={{ fontSize: "0.9rem" }}
				>
					No favourites yet — add some!
				</p>
			) : (
				favourites.map((item) => (
					<div
						key={item.trackId}
						className="d-flex align-items-center gap-2 mb-3"
						onClick={() => item.previewUrl && onPlay(item)}
						style={{ cursor: item.previewUrl ? "pointer" : "default" }}
					>
						{/* Favourite item — click row to preview, X to remove */}
						<img
							src={item.albumCover}
							alt={item.albumName || item.artistName || "Album artwork"}
							width="50"
							height="50"
							style={{ objectFit: "cover", borderRadius: "8px" }}
						/>
						{item.previewUrl && (
							<i
								className="bi bi-play-circle"
								style={{ color: "var(--muted)", fontSize: "0.8rem" }}
							></i>
						)}
						<div className="flex-grow-1">
							<p className="mb-0 small fw-bold">
								{item.trackName || item.albumName}
							</p>
							<p
								className="mb-0 small"
								style={{ color: "var(--muted)" }}
							>
								{item.artistName}
							</p>
						</div>

						{/* Remove favourite — X icon */}
						<i
							className="bi bi-x-lg"
							onClick={() => onRemoveFavourite(item.trackId)}
							style={{ cursor: "pointer", color: "#FFD700" }}
						></i>
					</div>
				))
			)}
		</div>
	);
}

export default FavouritesPanel;
