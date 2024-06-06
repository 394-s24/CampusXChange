// same setup as price filter test
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import TextBooks from '../pages/products/TextBooks';
import { onValue } from 'firebase/database';  

vi.mock('firebase/database', () => ({
  DataSnapshot: vi.fn(),
  onValue: vi.fn(),
}));

// same mock data
const mockData = [
  { Name: 'ANTHRO 213 Book', Price: 30, Tags: ['ANTHRO 213'], Authors: ['Author1'], Edition: '1st', Condition: 'New' },
  { Name: 'ASTRO 110 Book', Price: 50, Tags: ['ASTRO 110'], Authors: ['Author2'], Edition: '2nd', Condition: 'Used' },
  { Name: 'BIO 217 Book', Price: 70, Tags: ['BIO 217'], Authors: ['Author3'], Edition: '3rd', Condition: 'New' },
  { Name: 'CHEM 171 Book', Price: 90, Tags: ['CHEM 171'], Authors: ['Author4'], Edition: '4th', Condition: 'Used' },
  { Name: 'EA 1 Book', Price: 20, Tags: ['EA 1'], Authors: ['Author5'], Edition: '5th', Condition: 'New' },
];

// desc
describe('Search Functionality with Malformed Entries', () => {
    beforeEach(() => {
      vi.mocked(onValue).mockImplementation((ref, callback) => {
        const snapshot = { val: () => mockData };
        callback(snapshot);
      });

    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    // list of malformed entries: typo, extra character, case insensitive, incomplete input
    const malformedInputs = [
      { description: "typo", input: "ANTRO 213", expectedResults: 0 },
      { description: "extra characters", input: "ANTHRO 213#", expectedResults: 0 },
      { description: "case insensitive", input: "anthro 213", expectedResults: 1 },
      { description: "incomplete input", input: "ANTHR", expectedResults: 1 },
      { description: "normal", input: "ANTHRO 213", expectedResults: 1 }
    ];
  
    // loops through the inputs, and checks if the results are as expected
    malformedInputs.forEach(({ description, input, expectedResults }) => {
      test(`searching with a malformed entry: ${description}`, async () => {
        render(<TextBooks textbookCountRef={{}} />);
        
        // searching
        await waitFor(() => expect(screen.getByPlaceholderText('Search for an item')).toBeInTheDocument());
  
        fireEvent.change(screen.getByPlaceholderText('Search for an item'), { target: { value: input } });
  
        // checks to see if it is displayed or not
        await waitFor(() => {
          const displayedBooks = screen.queryAllByText(/Book$/);
          expect(displayedBooks.length).toBe(expectedResults);
        });
      });
    });
  });


