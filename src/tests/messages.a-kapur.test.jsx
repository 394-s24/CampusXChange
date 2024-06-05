import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { db, firestore, firebaseRef } from '../firebase';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Contact from '../pages/contact';

describe('personal profile tests', () => {
  test('check if message component renders', async () => {
    const textbookCountRef = firebaseRef(db, '/textbooks');
    const usersCountRef = firebaseRef(db, '/users');

    render(
      <MemoryRouter initialEntries={['/profile/BaNh0XHzyBNNtiUH2veJFEEEEzm1']}>
        <Routes>
          <Route
            path="/profile/:userid"
            element={<Contact textbookCountRef={textbookCountRef} usersCountRef={usersCountRef} curUser={{ uid: 'BaNh0XHzyBNNtiUH2veJFEEEEzm1', displayName: "Carol Liu" }} firestore={firestore} />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the "Messages" option and click it
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
