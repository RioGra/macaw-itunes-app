import { render } from "@testing-library/react";

// Tools describe and check the tests
import { describe, it, expect, vi } from "vitest";
import AudioPlayer from "../components/AudioPlayer";

describe("AudioPlayer", () => {
	// Checks that no player appears without a selected track
	it("renders nothing when no track is selected ", () => {
		// Display AudioPlayer with no track selected
		const { container } = render(
			<AudioPlayer
				currentTrack={null}
				onClose={vi.fn()}
			/>,
		);

		// Confirm that the component displays nothing
		expect(container.firstChild).toBeNull();
	});
});
