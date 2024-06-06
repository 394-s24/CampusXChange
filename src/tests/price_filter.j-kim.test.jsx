import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import TextBooks from '../pages/products/TextBooks';
import { onValue } from 'firebase/database';  

// Mock Firebase functions and dependencies
vi.mock('firebase/database', () => ({
  DataSnapshot: vi.fn(),
  onValue: vi.fn(),
}));



// Sample mock data (same as Hong)
const mockData = [
  { Name: 'ANTHRO 213 Book', Price: 30, Tags: ['ANTHRO 213'], Authors: ['Author1'], Edition: '1st', Condition: 'New' },
  { Name: 'ASTRO 110 Book', Price: 50, Tags: ['ASTRO 110'], Authors: ['Author2'], Edition: '2nd', Condition: 'Used' },
  { Name: 'BIO 217 Book', Price: 70, Tags: ['BIO 217'], Authors: ['Author3'], Edition: '3rd', Condition: 'New' },
  { Name: 'CHEM 171 Book', Price: 90, Tags: ['CHEM 171'], Authors: ['Author4'], Edition: '4th', Condition: 'Used' },
  { Name: 'EA 1 Book', Price: 20, Tags: ['EA 1'], Authors: ['Author5'], Edition: '5th', Condition: 'New' },
];


// implementatino of mock data
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



  test('only items that are $50 or under are displayed', async () => {
    render(<TextBooks textbookCountRef={{}} />);

    await waitFor(() => expect(screen.getByPlaceholderText('Search for an item')).toBeInTheDocument());

    // clicking filter icon
    fireEvent.click(screen.getByTestId('filter-icon'));
    // clicking on the under 50 checkbox
    fireEvent.click(screen.getByTestId('checkbox-under-50'));
    // getting an expected count for books
    const expectedBooksUnder50 = mockData.filter(book => book.Price <= 50).length;
    // getting the actual displayed number
    await waitFor(() => {
      const displayedBooks = screen.getAllByText(/Book$/); 
      expect(displayedBooks.length).toBe(expectedBooksUnder50);
    });

    // close filter
    fireEvent.click(screen.getByTestId('filter-icon'));
  });
});
