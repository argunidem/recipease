import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCAsSKABBpXa56wWaixWdDcBoqIJzw-3LI',
  authDomain: 'recipease-63e46.firebaseapp.com',
  projectId: 'recipease-63e46',
  storageBucket: 'recipease-63e46.appspot.com',
  messagingSenderId: '259185937618',
  appId: '1:259185937618:web:0e1ea8cfa153e7a6fc310b',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
