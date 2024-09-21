import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyChR8Y-a78XaL2htplUhZePMeWk5O4otBE',
  authDomain: 'pontotel-caf31.firebaseapp.com',
  projectId: 'pontotel-caf31',
  storageBucket: 'pontotel-caf31.appspot.com',
  messagingSenderId: '157885076296',
  appId: '1:157885076296:web:706657e44fc530460e597d',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
