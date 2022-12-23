import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

const ChatRoom = ({ app }) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const dummy = useRef();

  console.log("firestore:", db);

  // Imp: collection name should be exactly matching to the collection name in firebase
  const messagesRef = collection(db, "message");
  console.log("messagesRef:", messagesRef);
  // const q = query(messagesRef, orderBy("createdAt", "asc"), limit(3));
  const q = query(messagesRef, orderBy("createdAt", "asc"));
  console.log("q:", q);
  const [messages] = useCollectionData(q, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  console.log("messages:", messages);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    console.log("uid, photoURL:", uid, photoURL);

    try {
      const docRef = await addDoc(collection(db, "message"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
      console.log("docRef:", docRef);

      setFormValue("");
      console.log("dummy.current:", dummy);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      console.log("e:", e);
    }
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={`${msg.uid}`}
              message={msg}
            />
          ))}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          Submit
        </button>
      </form>
    </>
  );
};
export default ChatRoom;
