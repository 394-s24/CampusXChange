import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Contact from '../pages/contact';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import checkPost from '../pages/functions/checkPost';
import toast, { Toaster } from 'react-hot-toast';


// Mock the toast module
vi.mock('react-hot-toast', () => ({
    __esModule: true,
    default: vi.fn(),
    Toaster: () => <div />,
  }));
  
  // Mock firebase functions
  vi.mock('../../qfirebase', () => {
    const initializeApp = vi.fn();
    const getAuth = vi.fn(() => ({
      currentUser: { uid: 'testUserId', displayName: 'Test User' },
    }));
    const getDatabase = vi.fn();
    const getFirestore = vi.fn();
    const onAuthStateChanged = vi.fn();
    const ref = vi.fn();
    const get = vi.fn();
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
    const renderComponent = () =>
      render(
        <MemoryRouter initialEntries={['/contact/testUserId']}>
          <Routes>
            <Route
              path="/contact/:userid"
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
  
      it('warning toast if empty when submitting the form', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('New Post'));
        expect(screen.getByText('Submit Posting')).toBeInTheDocument();
        // Leave the form fields empty and submit
        fireEvent.submit(screen.getByRole('form'));
        // Verify if the error toast was called with the correct message
        expect(toast).toHaveBeenCalledWith('Please fill in all fields.');
      });

      it('no toast when all fields are present', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('New Post'));
        fireEvent.click(screen.getByText('Add New Tag'));
        fireEvent.change(screen.getByPlaceholderText('Enter tag here'), {
          target: { value: 'tag1' },
        });
        console.log('tag field value:', screen.getByPlaceholderText('Enter tag here').value);
        fireEvent.change(screen.getByPlaceholderText('Type author name here'), {
          target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type class name here'), {
          target: { value: 'Class 101' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type condition here'), {
          target: { value: 'New' },
        });
    
        fireEvent.change(screen.getByPlaceholderText('Type description here'), {
          target: { value: 'A great book' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type edition here'), {
          target: { value: '1st' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type book name here'), {
          target: { value: 'React for Beginners' },
        });
        fireEvent.change(screen.getByPlaceholderText('Type price here'), {
          target: { value: '20' },
        });
        //All fields populated
        fireEvent.submit(screen.getByRole('form'));
        await waitFor(() => {
            expect(toast).not.toHaveBeenCalledWith('Please fill in all fields');
          });
      });  
    });