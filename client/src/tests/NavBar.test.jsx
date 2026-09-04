import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
	// Check that the Macaw app name is displayed
	it("renders Macaw app name", () => {
		render(
			<NavBar
				favouriteCount={0}
				onToggleDrawer={vi.fn()}
			/>,
		);
		//Confirm that MACAW app name is displayed
		expect(screen.getByText(/MACAW/)).toBeInTheDocument();
	});
});
