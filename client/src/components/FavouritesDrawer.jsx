// MOBILE: Off canvas drawer showing saved favourites
function FavouritesDrawer({
	favourites,
	onRemoveFavourite,
	show,
	onClose,
	onPlay,
}) {
	return (
		<div
			className={`offcanvas offcanvas-end ${show ? "show" : ""}`}
			style={{ visibility: show ? "visible" : "hidden" }}
		>
			{/* Drawer header - title and close button */}
			<div className="offcanvas-header">
				<h5 className="offcanvas-title">
					<i
						className="bi bi-heart-fill"
						style={{ color: "#FFD700" }}
					></i>{" "}
					Favourites {favourites.length}
				</h5>
				<button
					className="btn btn-sm btn-drawer-close ms-auto"
					onClick={onClose}
				>
					<i className="bi bi-x-lg"></i>
				</button>
			</div>

			{/* Drawer body- empty state or favourites list */}
			<div className="offcanvas-body">
				{/* Render each favourite item — click to preview if available */}
				{favourites.length === 0 ? (
					<p className="text-muted text-center mt-4">
						No favourites yet - add some!
					</p>
				) : (
					favourites.map((item) => (
						<div
							key={item.trackId}
							className="d-flex align-items-center gap-2 mb-3"
							onClick={() => item.previewUrl && onPlay(item)}
							style={{ cursor: item.previewUrl ? "pointer" : "default" }}
						>
							{item.previewUrl && (
								<i
									className="bi bi-play-circle"
									style={{ color: "var(--muted)", fontSize: "0.8rem" }}
								></i>
							)}
							<img
								src={item.albumCover}
								alt={item.albumName || item.artistName || "Album artwork"}
								width="50"
								height="50"
								style={{ objectFit: "cover" }}
							/>
							<div className="flex-grow-1">
								<p className="mb-0 small fw-bold">
									{item.trackName || item.albumName}
								</p>
								<p className="mb-0 small text-muted">{item.artistName}</p>
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
		</div>
	);
}

export default FavouritesDrawer;
