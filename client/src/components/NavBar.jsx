//Sticky navbar- logo + favourites toggle button

function NavBar({ favouriteCount, onToggleDrawer }) {
	return (
		<nav className="navbar navbar-dark bg-dark sticky-top">
			<div className="container-fluid">
				{/* App logo/title */}
				<span className="navbar-brand fw-bold"> MACAW</span>

				{/* Favourites button with badge count */}
				<button
					className="btn btn-outline-light position-relative"
					onClick={onToggleDrawer}
				>
					<i
						className="bi bi-heart-fill"
						style={{ color: "white" }}
					></i>{" "}
					Favourites
					{favouriteCount > 0 && (
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							{favouriteCount}
						</span>
					)}
				</button>
			</div>
		</nav>
	);
}

export default NavBar;
