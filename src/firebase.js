import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgxLmrdOkwmILOedk72n-fSzpAmUCx0s0",
  authDomain: "ecowiser-task.firebaseapp.com",
  projectId: "ecowiser-task",
  storageBucket: "ecowiser-task.appspot.com",
  messagingSenderId: "285241874402",
  appId: "1:285241874402:web:fd177351356db3866ecbbb",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
