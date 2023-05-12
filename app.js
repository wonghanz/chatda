import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");

function sendMessage() {
  // Validate the message
  if (message.trim() === "") {
    return;
  }

  // Send the message to the server
  axios.post("/messages", {
    message,
  }).then((response) => {
    setMessages([...messages, response.data]);
    setMessage("");
  }).catch((error) => {
    console.log(error);
  });
}

function handleChange(event) {
  setMessage(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  sendMessage();
}

function render() {
  return (
    <div>
      <h1>Chat App</h1>
      <ul id="messages">
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      <input type="text" id="message" value={message} onChange={handleChange} />
      <button id="send" onClick={handleSubmit}>Send</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
