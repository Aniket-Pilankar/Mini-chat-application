import { getAuth } from "firebase/auth";

const SignOut = () => {
  const auth = getAuth();
  return (
    auth.currentUser && (
      <button
        className="sign-out"
        onClick={() => {
          auth.signOut();
        }}
      >
        SignOut
      </button>
    )
  );
};
export default SignOut;
