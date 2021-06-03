import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGIN,
  // appId: process.env.REACT_APP_API_ID,
  apiKey: 'AIzaSyA5rdOQn3CaCdXqiaKBzV3fiMwx3Ec42A8',
  authDomain: 'nwitter-971af.firebaseapp.com',
  projectId: 'nwitter-971af',
  storageBucket: 'nwitter-971af.appspot.com',
  messagingSenderId: '42447438915',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
