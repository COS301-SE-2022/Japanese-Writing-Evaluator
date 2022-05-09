import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQKvl_6Tpq--PbrXt398GilNZvnQ4N70c",
  authDomain: "japanesewritingevaluator-c2ca3.firebaseapp.com",
  projectId: "japanesewritingevaluator-c2ca3",
  storageBucket: "japanesewritingevaluator-c2ca3.appspot.com",
  messagingSenderId: "785964374628",
  appId: "1:785964374628:web:073a897af4639dc0badd71",
  measurementId: "G-ZXYNQT710Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);