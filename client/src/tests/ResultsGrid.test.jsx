import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResultsGrid from "../components/ResultsGrid";

describe("ResultsGrid", () => {
	// Check the message shown before a search is made
	it("shows discover message on initial load", () => {
		// Display the grid with no results and no search
		render(
			<ResultsGrid
				results={[]}
				loading={false}
				onAddFavourite={vi.fn()}
				favourites={[]}
				hasSearched={false}
				onPlay={vi.fn()}
			/>,
		);
		// Confirm that the discover message is displayed
		expect(screen.getByText(/Discover/)).toBeInTheDocument();
	});

	// Check the message shown when a search returns no results
	it("shows no results message after a search", () => {
		// Display the grid after a search with no results
		render(
			<ResultsGrid
				results={[]}
				loading={false}
				onAddFavourite={vi.fn()}
				favourites={[]}
				hasSearched={true}
				onPlay={vi.fn()}
			/>,
		);

		// Confirm that the no-results message appears
		expect(screen.getByText(/No results found/)).toBeInTheDocument();
	});
});
