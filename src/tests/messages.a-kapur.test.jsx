import React from 'react';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Contact from '../pages/contact';
import '@testing-library/jest-dom';

// Mock firebase functions
vi.mock('../../firebase', () => {
  const initializeApp = vi.fn();
  const getAuth = vi.fn(() => ({
    currentUser: { uid: 'testUserId', displayName: 'Test User' },
  }));
  const getDatabase = vi.fn();
  const getFirestore = vi.fn();
  const onAuthStateChanged = vi.fn();
  const ref = vi.fn();
  const get = vi.fn(() => Promise.resolve({ val: () => ({ name: 'Test User', email: 'test@example.com', phoneNumber: '1234567890' }) }));
  const set = vi.fn().mockResolvedValue({});

  return {
    initializeApp,
    getAuth,
    getDatabase,
    getFirestore,
    onAuthStateChanged,
    ref,
    get,
    set,
    auth: {
      currentUser: { uid: 'testUserId', displayName: 'Test User' },
    },
    db: {},
    firestore: {},
  };
});

describe('Contact Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={['/profile/testUserId']}>
        <Routes>
          <Route
            path="/profile/:userid"
            element={
              <Contact
                textbookCountRef={{}}
                usersCountRef={{}}
                curUser={{ uid: 'testUserId', displayName: 'Test User' }}
                firestore={{}}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

  test('check if message component renders', async () => {
    renderComponent();

    // Wait for the "Messages" option to appear and click it
    const messagesOption = await waitFor(() => screen.getByText('Messages'));
    fireEvent.click(messagesOption);

    // Check for the input bar and the send button
    const inputBar = await waitFor(() => screen.getByPlaceholderText('send a message :)'));
    expect(inputBar).toBeInTheDocument();

    const sendButton = screen.getByRole('button', { name: /send/i });
    expect(sendButton).toBeInTheDocument();

    // Simulate changing the value of the input bar
    fireEvent.change(inputBar, { target: { value: 'Hello, this is a test message!' } });
    expect(inputBar.value).toBe('Hello, this is a test message!');
  });
});
