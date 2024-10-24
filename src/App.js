// src/App.js
import React, { useState } from "react";
import Auth from "./components/Auth";
import TodoList from "./components/TodoList";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome {user.email}</h1>
          <TodoList />
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
}

export default App;
