import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCP_evRoqQ0nDSCUGmKt54Ejwr3Ugt6B-A",
  authDomain: "logingoolge-16163.firebaseapp.com",
  projectId: "logingoolge-16163",
  storageBucket: "logingoolge-16163.appspot.com",
  messagingSenderId: "657645897545",
  appId: "1:657645897545:web:c488d7e462fd8af760bc98",
  measurementId: "G-KVB526QJ3H",
};

const app = initializeApp(firebaseConfig);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);

  function login() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " " + errorMessage);
      });
  }

  function loginformGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(user);
        console.log(token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        //teste
        //tese
      });
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Criar user</button>
      <button onClick={loginformGoogle}>login com google</button>
    </div>
  );
}

export default App;
