// src/App.js
import React, { useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    const newItem = { id: Date.now(), title, description };
    setItems([...items, newItem]);
    setTitle("");
    setDescription("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
          <h1>Welcome, {user.username}!</h1>

          {/* Add Bucket List Item */}
          <form onSubmit={addItem} style={{ margin: "2rem 0" }}>
            <input
              type="text"
              placeholder="Item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ marginRight: "0.5rem" }}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ marginRight: "0.5rem" }}
            />
            <button type="submit">Add Item</button>
          </form>

          {/* List of Items */}
          <div>
            {items.length === 0 ? (
              <p>No items yet.</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong>: {item.description}{" "}
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button style={{ marginTop: "2rem" }} onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </Authenticator>
  );
}
