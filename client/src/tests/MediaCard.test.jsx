import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MediaCard from "../components/MediaCard";

// Mock item: test data used for testing purposes
const mockItem = {
	trackName: "Everything in Its Right Place",
	albumName: "Kid A",
	artistName: "Radiohead",
	albumCover: "https://example.com/cover.jpg",
	releaseDate: "2000-10-02",
	trackId: 12345,
	previewUrl: null,
};

describe("MediaCard", () => {
	// Check that the artist name is displayed
	it("displays artist name", () => {
		render(
			<MediaCard
				item={mockItem}
				onAddFavourite={vi.fn()}
				isFavourite={false}
				onPlay={vi.fn()}
			/>,
		);
		expect(screen.getByText("Radiohead")).toBeInTheDocument();
	});

	// Check that the Add to Favourites button is displayed 
	it("displays Add to Favourites button", () => {
		render(
			<MediaCard
				item={mockItem}
				onAddFavourite={vi.fn()}
				isFavourite={false}
				onPlay={vi.fn()}
			/>,
		);
		expect(screen.getByText("Add to Favourites")).toBeInTheDocument();
	});

	//Check that the button changes to Added for a favourite item
	it("shows Added when item is a favourite", () => {
		render(
			<MediaCard
				item={mockItem}
				onAddFavourite={vi.fn()}
				isFavourite={true}
				onPlay={vi.fn()}
			/>,
		);
		expect(screen.getByText("Added")).toBeInTheDocument();
	});
});
