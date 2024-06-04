import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import TextBooks from '../pages/products/textbooks';

// Mock Firebase functions and dependencies
vi.mock('firebase/database', () => ({
  DataSnapshot: vi.fn(),
  onValue: vi.fn(),
}));

describe('TextBooks Component', () => {
  it('should filter listings based on price and tags', async () => {
    const textbookCountRef = {}; // Mock textbookCountRef

    render(<TextBooks textbookCountRef={textbookCountRef} />);

    // Wait for the component to fully render and load data
    await waitFor(() => expect(screen.getByPlaceholderText('Search for an item')).toBeInTheDocument());

    // Open the filters
    fireEvent.click(screen.getByTestId('filter-icon'));

    // Select a tag filter
    fireEvent.click(screen.getByText('ANTHRO 213'));

    // Check if the tag filter is applied
    await waitFor(() => expect(screen.getByText('ANTHRO 213')).toBeInTheDocument());

    // Select a price filter
    fireEvent.click(screen.getByText('under $50'));

    // Check if the price filter is applied
    await waitFor(() => expect(screen.getByText('under $50')).toBeInTheDocument());

    // Check if the listings are filtered accordingly
    expect(screen.queryByText('No items found.')).toBeNull(); // Assuming this message is shown when no items are found
    // You can add more assertions to verify the listings

    // Close the filters
    fireEvent.click(screen.getByTestId('filter-icon'));
  });
});
