import '../setupTests.jsx';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Contact from '../pages/contact';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, getDocs, query, collection, where } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database';

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    signOut: vi.fn(() => Promise.resolve()),
    onAuthStateChanged: vi.fn((authStateCallback) => authStateCallback({ uid: 'testUserId', displayName: 'Test User' })),
}));
  
  vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
  }));
  
  vi.mock('firebase/database', () => ({
    getDatabase: vi.fn(() => ({})),
    ref: vi.fn(() => ({})),
    set: vi.fn(() => Promise.resolve()),
    get: vi.fn(() => Promise.resolve({ val: () => [] })),
  }));
  
// Mock other dependencies
vi.mock('react-router-dom', () => ({
  useParams: () => ({ userid: 'testUserId' }),
}));

describe('Contact Component', () => {
    it('should submit a new item posting', async () => {
        const curUser = {
          uid: 'testUserId',
          displayName: 'Test User',
        };
    
        // Set toggleNewPost to true
        render(
          <Contact
            toggleNewPost={true}
            textbookCountRef={ref(getDatabase(), 'textbookCount')}
            usersCountRef={ref(getDatabase(), 'usersCount')}
            curUser={curUser}
            firestore={getFirestore()}
          />
        );
    
    // Wait for the component to fully render and load data
    await waitFor(() => {
        expect(screen.getByText('New Post')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('New Post'));

    // Fill out the form (assuming the form elements are present)
    fireEvent.change(screen.getByPlaceholderText('Type author name here'), {
      target: { value: 'Test Author' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type class name here'), {
      target: { name: 'class', value: 'Test Class' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type condition here'), {
      target: { name: 'condition', value: 'New' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type description here'), {
      target: { name: 'description', value: 'A test book' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type edition here'), {
      target: { name: 'edition', value: '1st' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type book name here'), {
      target: { name: 'name', value: 'Test Book' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type price here'), {
      target: { name: 'price', value: 100 },
    });

    expect(screen.getByText('Submit Posting')).toBeInTheDocument();
  });
});

