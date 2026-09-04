import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FavouritesPanel from '../components/FavouritesPanel';

describe('FavouritesPanel', () => {
  // Check the message shown when there are no favourites
  it('shows empty state when no favourites', () => {
    render(
      <FavouritesPanel
        favourites={[]}
        onRemoveFavourite={vi.fn()}
        show={true}
        onClose={vi.fn()}
        onPlay={vi.fn()}
      />
    );
    expect(screen.getByText(/No favourites yet/)).toBeInTheDocument();
  });

  // Check that a  saved song title is displayed
  it("shows a favourite", () => {
    render(
      <FavouritesPanel
        favourites={[
          {
            trackId: 1,
            trackName: "Test Song",
            artistName: "Test Artist",
            albumCover: "cover.jpg",
          },
        ]}
        onRemoveFavourite={vi.fn()}
        show={true}
        onClose={vi.fn()}
        onPlay={vi.fn()}
      />
    );

    expect(screen.getByText("Test Song")).toBeInTheDocument();
  });
});