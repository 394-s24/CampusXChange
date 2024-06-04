import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App, { validAccount, auth, writeUserData } from '../App';
import Layout from "../pages/layout";
import '@testing-library/jest-dom';

// import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getDatabase, ref, get, set } from 'firebase/database';
import { app, db, firestore, firebaseRef, userAuth, getData, setData } from '../firebase';
import { addDoc, collection, serverTimestamp } from '../../firebase';


vi.mock('../../firebase', () => {
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
import Message, { isValidMessage } from '../components/Message';

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

import checkPost from "../pages/functions/checkPost"
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
