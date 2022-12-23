// import firebase from "firebase/app";
// import { initializeApp,firestore,auth } from "firebase/app";

// const auth = firebase.auth;

const SignIn = ({ signInWithGoogle }) => {
  return <button className="sign-in" onClick={signInWithGoogle}>Sign In with Google</button>;
};
export default SignIn;
