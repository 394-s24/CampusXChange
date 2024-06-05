import { describe, expect, test} from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { db, firestore, firebaseRef} from '../firebase';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Contact from '../pages/contact';

describe('personal profile tests', () => {
    test('check if all chats are visible in personal profile messages', async () => {
        const textbookCountRef = firebaseRef(db, '/textbooks');
        const usersCountRef = firebaseRef(db, '/users');

        // Mock successful Google sign-in
        // await signInWithPopup(auth, new GoogleAuthProvider());

        // render(<Contact textbookCountRef={textbookCountRef} usersCountRef={usersCountRef} curUser={{ uid: 'BaNh0XHzyBNNtiUH2veJFEEEEzm1' }} firestore={firestore} />);

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

        try {
            const messagesOption = await waitFor(() => expect(screen.getByText('Messages')).toBeInTheDocument());
            fireEvent.click(messagesOption);
            // Check for messages within the messages-list div
            const messagesList = screen.getByClass('messages-list');
            const rachelMessage = within(messagesList).getByText('Rachel Yao');
            const anoushkaMessage = within(messagesList).getByText('Anoushka Sarup');

            expect(rachelMessage).toBeInTheDocument();
            expect(anoushkaMessage).toBeInTheDocument();


        } catch (err) {
            console.error('Error:', err);
        }
    });
});
