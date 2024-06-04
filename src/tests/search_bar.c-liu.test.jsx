import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextBooks from '../pages/products/textbooks';
import {db, firebaseRef} from '../firebase';
// import App from '../App';

describe('search bar tests', () => {
  test('types "linear" in the search bar and checks for 1 specific item', async () => {
    // render(<App />);
    // const textbookCountRef = {}; // Mock textbookCountRef
    const textbookCountRef = firebaseRef(db, '/textbooks');
    render(<TextBooks textbookCountRef={textbookCountRef} />);

    // const signInButton = screen.getByText('Sign In With Google');
    // fireEvent.click(signInButton);
    await waitFor(() => expect(screen.getByPlaceholderText('Search for an item')).toBeInTheDocument());

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