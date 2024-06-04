import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import TextBooks from '../pages/products/TextBooks';
import { onValue } from 'firebase/database';  // Import onValue from firebase/database

// Mock Firebase functions and dependencies
vi.mock('firebase/database', () => ({
  DataSnapshot: vi.fn(),
  onValue: vi.fn(),
}));

// Sample mock data for testing
const mockData = [
  { Name: 'ANTHRO 213 Book', Price: 30, Tags: ['ANTHRO 213'], Authors: ['Author1'], Edition: '1st', Condition: 'New' },
  { Name: 'ASTRO 110 Book', Price: 50, Tags: ['ASTRO 110'], Authors: ['Author2'], Edition: '2nd', Condition: 'Used' },
  { Name: 'BIO 217 Book', Price: 70, Tags: ['BIO 217'], Authors: ['Author3'], Edition: '3rd', Condition: 'New' },
  { Name: 'CHEM 171 Book', Price: 90, Tags: ['CHEM 171'], Authors: ['Author4'], Edition: '4th', Condition: 'Used' },
  { Name: 'EA 1 Book', Price: 20, Tags: ['EA 1'], Authors: ['Author5'], Edition: '5th', Condition: 'New' },
];

describe('TextBooks Component', () => {
  beforeEach(() => {
    vi.mocked(onValue).mockImplementation((ref, callback) => {
      const snapshot = { val: () => mockData };
      callback(snapshot);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('filters items based on an empty tag search correctly', async () => {
    render(<TextBooks textbookCountRef={{}} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Search for an item')).toBeInTheDocument());

    // Open the filters
    fireEvent.click(screen.getByTestId('filter-icon'));

    // Try searching with an empty tag
    fireEvent.click(screen.getByText('ANTHRO 213'));

    // Deselect the tag to make the activeTags empty
    fireEvent.click(screen.getByText('ANTHRO 213'));

    // Check if the items are displayed correctly
    await waitFor(() => {
      expect(screen.getByText('ANTHRO 213 Book')).toBeInTheDocument();
      expect(screen.getByText('ASTRO 110 Book')).toBeInTheDocument();
      expect(screen.getByText('BIO 217 Book')).toBeInTheDocument();
      expect(screen.getByText('CHEM 171 Book')).toBeInTheDocument();
      expect(screen.getByText('EA 1 Book')).toBeInTheDocument();
    });
  });


  test('filters items based on search input', async () => {
    render(<TextBooks textbookCountRef={{}} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Search for an item')).toBeInTheDocument());

    // Enter search value
    fireEvent.change(screen.getByPlaceholderText('Search for an item'), { target: { value: 'BIO' } });

    // Check if the search filter is applied
    await waitFor(() => {
      expect(screen.getByText('BIO 217 Book')).toBeInTheDocument();
      expect(screen.queryByText('ANTHRO 213 Book')).toBeNull();
    });
  });
});

