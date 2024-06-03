// ItemDetails.e-lee.test.jsx
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemDetails from '../components/ItemDetails';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ItemDetails Component', () => {
  const item = {
    Name: 'Sample Item',
    Price: '$10',
    Description: 'Sample Description',
    Tags: ['SampleTag'],
    Username: 'seller123',
    Uid: '123'
  };

  test('should initiate chat from profile page', () => {
    render(
      <Router>
        <ItemDetails item={item} toggleDetails={vi.fn()} />
      </Router>
    );

    const contactButton = screen.getByText('Contact');
    expect(contactButton.closest('a')).toHaveAttribute('href', '/profile/123');
  });
});
