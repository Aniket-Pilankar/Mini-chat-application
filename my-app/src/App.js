import "./App.css";

// Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignIn from "./Components/SignIn";
import ChatRoom from "./Components/ChatRoom";
import SignOut from "./Components/SignOut";

const firebaseConfig = {
  apiKey: "AIzaSyB9K0CwMmZ0beo-ApOkoM8bt9a8xvKVYUE",
  authDomain: "mini-chat-application-3f60e.firebaseapp.com",
  projectId: "mini-chat-application-3f60e",
  storageBucket: "mini-chat-application-3f60e.appspot.com",
  messagingSenderId: "358768198681",
  appId: "1:358768198681:web:95ccd25b78055647d2d688",
  measurementId: "G-VNNBQ11M07",
};

const app = initializeApp(firebaseConfig);
console.log("app:", app);
const auth = getAuth(app);
console.log("auth:", auth);
const db = getFirestore(app);
console.log("db:", db);

// const auth = firebase.auth;
// const firestore = firebase.firestore;

function App() {
  const [user] = useAuthState(auth);
  console.log("user:", user);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    console.log("provider:", provider);
    signInWithPopup(auth, provider);
  };

  return (
    <div className="App">
      <header>
        <h1>Chat</h1>
        <SignOut />
      </header>

      <section>
        {user ? (
          <ChatRoom app={app} />
        ) : (
          <SignIn signInWithGoogle={signInWithGoogle} />
        )}
      </section>
    </div>
  );
}

export default App;
