// TagFilter.e-lee.test.jsx
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TagFilter from '../components/TagFilter';

describe('TagFilter Component', () => {
  let activeTags;
  let setActiveTags;

  beforeEach(() => {
    activeTags = [];
    setActiveTags = vi.fn();
  });

  test('should handle empty tag search', () => {
    render(
      <TagFilter 
        text="Sample Tag" 
        value="" 
        activeTags={activeTags} 
        setActiveTags={setActiveTags} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(setActiveTags).toHaveBeenCalledWith([""]);
  });
});
