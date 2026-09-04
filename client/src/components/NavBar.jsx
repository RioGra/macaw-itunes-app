import macawLogo from "../assets/macaw.jpg";

// Sticky navbar - logo + favourites toggle button
function NavBar({ favouriteCount, onToggleDrawer }) {
	return (
		<nav className="navbar navbar-dark sticky-top">
			<div className="container-fluid">
				{/* App logo/title */}
				<span className="navbar-brand fw-bold">
					MACAW
					<img
						src={macawLogo}
						alt="Macaw Logo"
						width="52"
						height="52"
						className="ms-2"
						style={{
							borderRadius: "50%",
							objectFit: "cover",
							border: "1.5px solid #FFD700",
						}}
					/>
				</span>
				{/* Favourites button with badge count */}
				<button
					className="btn btn-outline-light position-relative"
					onClick={onToggleDrawer}
				>
					{/* Heart icon — color controlled via CSS .navbar .btn i */}
					<i className="bi bi-heart-fill"></i> Favourites
					{favouriteCount > 0 && (
						<span
							className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
							style={{ fontSize: "0.65rem" }}
						>
							{favouriteCount}
						</span>
					)}
				</button>
			</div>
		</nav>
	);
}

export default NavBar;
