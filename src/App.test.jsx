import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App, { validAccount, auth, writeUserData } from './App';
import Layout from "./pages/layout";
import '@testing-library/jest-dom';

// import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getDatabase, ref, get, set } from 'firebase/database';
import { app, db, firestore, firebaseRef, userAuth, getData, setData } from './firebase';
import { addDoc, collection, serverTimestamp } from '../firebase';


vi.mock('../firebase', () => {
  return {
    auth: {
      currentUser: { uid: '123', displayName: 'Test User' }
    },
    firestore: {},
    addDoc: vi.fn().mockResolvedValue({}),
    collection: vi.fn().mockReturnValue({}),
    serverTimestamp: vi.fn().mockReturnValue(new Date()),
  };
});

// Unit test for isValidMessage function
import Message, { isValidMessage } from './components/Message';

describe('isValidMessage Tests', () => {
  test('returns true when the message is not empty', () => {
    const message = "Hello!";
    expect(isValidMessage(message)).toBe(true);
  });

  test('returns false when the message is empty', () => {
    const message = "";
    expect(isValidMessage(message)).toBe(false);
  });
});

import checkPost from "./pages/functions/checkPost"
describe('New Post Test', () => {
  const e = {
    target: {
      class: { value: "TEST102" },
      condition: { value: "NEW" },
      description: { value: "A detailed description of the textbook" },
      edition: { value: "2nd Edition" },
      name: { value: "Advanced Testing Techniques" },
      price: { value: "49.99" }
    }
  };

  const tags1 = []

  test('No Tags returns false', () => {
    expect(checkPost(e, tags1)).toBe(false);
  });

  const tags2 = ["tag 1"]

  test('One Tag returns true', () => {
    expect(checkPost(e, tags2)).toBe(true);
  });

  const tags3 = ["tag 1", "tag 2", "tag 3", "tag 4"]

  test('Multiple Tag returns true', () => {
    expect(checkPost(e, tags3)).toBe(true);
  });

});

describe('App Component Tests', () => {
  test('App name in header should be present', () => {
    render(<App />);
    expect(screen.getByText('CampusXChange')).toBeDefined();
  });
});

// Mock Firebase and other dependencies
vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(),
  ref: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  onValue: vi.fn(),
}));

describe('Layout Component Tests', () => {
  const mockUser = { uid: '123', displayName: 'Test User' };
  const mockContent = <div>Mock Content</div>;

  test('Renders the user icon when user is logged in', () => {
    render(<Layout user={mockUser} content={mockContent} />);
    expect(screen.getByText('Test User')).toBeDefined();
  });

  test('Renders the header with logo text', () => {
    render(<Layout user={mockUser} content={mockContent} />);
    expect(screen.getByText('CampusXChange')).toBeDefined();
  });

  test('Renders the provided content', () => {
    render(<Layout user={mockUser} content={mockContent} />);
    expect(screen.getByText('Mock Content')).toBeDefined();
  });
});

import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
}));

describe('User Authentication Tests', () => {
  const mockUser = {
    uid: '12345',
    displayName: 'Test User',
    email: 'test@u.northwestern.edu',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Valid email domain returns true', () => {
    expect(validAccount('test@u.northwestern.edu')).toBe(true);
  });

  test('Invalid email domain returns false', () => {
    expect(validAccount('test@gmail.com')).toBe(false);
  });

});

/* describe('search bar tests', () => {
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
}); */