import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('search bar tests', () => {
  test('types "linear" in the search bar and checks for 1 specific item', async () => {
    render(<App />);

    // Find the search bar
    const searchBar = screen.getByPlaceholderText('Search for an item');

    // Type "linear" in the search bar
    fireEvent.change(searchBar, { target: { value: 'linear' } });

    // Wait for the element to appear
    const itemInfoWrapper = await waitFor(() =>
      screen.getByText((content, element) =>
        element.tagName.toLowerCase() === 'div' &&
        element.classList.contains('item-name') &&
        content.includes('Linear Algebra and Its Applications')
      )
    );

    // Check that the item is found and there is only one such item
    expect(itemInfoWrapper).toBeInTheDocument();
    expect(itemInfoWrapper).toHaveClass('item-name');
  });
});