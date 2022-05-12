// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from '@firebase/analytics';
import { getStorage } from '@firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQKvl_6Tpq--PbrXt398GilNZvnQ4N70c',
  authDomain: 'japanesewritingevaluator-c2ca3.firebaseapp.com',
  projectId: 'japanesewritingevaluator-c2ca3',
  storageBucket: 'japanesewritingevaluator-c2ca3.appspot.com',
  messagingSenderId: '785964374628',
  appId: '1:785964374628:web:073a897af4639dc0badd71',
  measurementId: 'G-ZXYNQT710Q'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);


