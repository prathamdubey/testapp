import { useState, useEffect } from "react";

import "./App.css";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, app } from "../firebase";

const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      {user ? (
        <>
          <div>Logged in as {user.displayName} </div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
          <button onClick={() => auth.signOut()}>Logout</button>

          <div className="messages">
          {messages.map(msg => (
            <div className={`message ${msg.data.uid === user.uid? 'current' : 'other'}`}>
              <img src={msg.data.photoURL} />
              {msg.data.text}
            </div>
          ))}

          </div>
        </>
      ): 
        <button onClick={handleGoogleLogin}>Login With Google</button>
}
    </div>
  );
}

export default App;
