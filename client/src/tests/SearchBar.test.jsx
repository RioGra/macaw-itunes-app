// Tools to display and test the component, find elements and simulate user clicks
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
	//Check that the search input field appears
	it("shows the Search input field", () => {
		render(<SearchBar onSearch={vi.fn()} />);

		expect(screen.getByPlaceholderText("Search iTunes...")).toBeInTheDocument();
	});

	// Check that the Search button appears
	it("shows the Search button", () => {
		render(<SearchBar onSearch={vi.fn()} />);

		expect(screen.getByText("Search")).toBeInTheDocument();
	});

	// Check that an empty search is not submitted
	it("does not search if the input is empty", () => {
		const onSearch = vi.fn();

		render(<SearchBar onSearch={onSearch} />);
		fireEvent.click(screen.getByText("Search"));

		expect(onSearch).not.toHaveBeenCalled();
	});

	// Check that  a typed search is submitted correctly
	it("searches for radiohead", () => {
		const onSearch = vi.fn();

		render(<SearchBar onSearch={onSearch} />);

		fireEvent.change(screen.getByPlaceholderText("Search iTunes..."), {
			target: { value: "radiohead" },
		});

		fireEvent.click(screen.getByText("Search"));
		expect(onSearch).toHaveBeenCalledWith("radiohead", "all");
	});
});
