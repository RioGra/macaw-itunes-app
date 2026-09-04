import { useState } from "react";

// Search input and media type dropdown — calls onSearch when submitted
function SearchBar({ onSearch }) {
	const [term, setTerm] = useState("");
	const [media, setMedia] = useState("all");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!term.trim()) return; // prevent empty search
		onSearch(term, media);
	};

	return (
		<div className="container py-3">
			<form
				onSubmit={handleSubmit}
				className="d-flex gap-2 flex-wrap"
			>
				{/* Search input with icon */}
				<div className="input-group flex-grow-1">
					<i className="bi bi-search search-icon" style={{ color: 'var(--muted)' }}></i>
					<input
						type="text"
						className="form-control"
						placeholder="Search iTunes..."
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div> {/* End of search-input */}

				{/* Media type custom dropdown */}
				<div className="dropdown">
					<button
						className="btn btn-flat dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
					>
						{media === "all"
							? "All"
							: media.charAt(0).toUpperCase() + media.slice(1)}
					</button>
					{/* Render each media type as a dropdown item */}
					<ul className="dropdown-menu dropdown-menu-dark">
						{[
							"all",
							"music",
							"movie",
							"podcast",
							"audiobook",
							"shortFilm",
							"tvShow",
							"software",
							"ebook",
						].map((type) => (
							<li key={type}>
								<button
									className="dropdown-item"
									type="button"
									onClick={() => setMedia(type)}
								>
									{type.charAt(0).toUpperCase() + type.slice(1)}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Search button */}
				<button
					type="submit"
					className="btn btn-primary"
				>
					Search
				</button>
			</form>
		</div>
	);
}

export default SearchBar;
