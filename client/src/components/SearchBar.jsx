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
				{/* Search input */}
				<input
					type="text"
					className="form-control"
					placeholder="Search iTunes..."
					value={term}
					onChange={(e) => setTerm(e.target.value)}
				/>
{/* Media type custom dropdown */}
<div className="dropdown">
  <button
    className="btn btn-flat dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
  >
    {media === 'all' ? 'All' : media.charAt(0).toUpperCase() + media.slice(1)}
  </button>
  <ul className="dropdown-menu dropdown-menu-dark">
    {['all','music','movie','podcast','audiobook','shortFilm','tvShow','software','ebook'].map((type) => (
      <li key={type}>
        <button className="dropdown-item" type="button" onClick={() => setMedia(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </li>
    ))}
  </ul>
</div>
				
				{/* <select
					className="form-select"
					value={media}
					onChange={(e) => setMedia(e.target.value)}
				>
					<option value="all">All</option>
					<option value="music">Music</option>
					<option value="movie">Movie</option>
					<option value="podcast">Podcast</option>
					<option value="audiobook">Audiobook</option>
					<option value="shortFilm">Short Film</option>
					<option value="tvShow">TV Show</option>
					<option value="software">Software</option>
					<option value="ebook">Ebook</option>
				</select> */}

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
