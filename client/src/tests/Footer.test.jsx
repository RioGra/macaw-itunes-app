import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer', () => {
  // Check that the footer text is displayed
  it('displays the footer text', () => {
    render(<Footer />);
    // Confirm that MACAW appears on the page
    expect(screen.getByText(/MACAW/)).toBeInTheDocument();
  });
});
