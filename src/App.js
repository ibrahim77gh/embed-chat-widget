// App.js
import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import logo from './logo.svg';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import '../src/custom-chat-widget.css';
function App({ title, subtitle, chatbot_id }) {
  // dcdc9b8e-1699-4dc2-aee6-4a5db516649f
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleNewUserMessage = async (newMessage) => {

    const userChatMessage = {
      role: 'user',
      content: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userChatMessage]);

    console.log(`New message incoming! ${newMessage}`);
    
    // Now send the message through the backend API
    const body = {
      messages: messages,
      chatbot_id: 'dcdc9b8e-1699-4dc2-aee6-4a5db516649f',
      query: newMessage
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/conversation/', body);
      addResponseMessage(response.data.response);
      const responseChatMessage = {
        role: 'assistant',
        content: response.data.response,
      };
      setMessages((prevMessages) => [...prevMessages, responseChatMessage]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="App">
      <Widget  
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title={title}
        subtitle={subtitle}
        emojis={true}
        
      />
    </div>
  );
}

export default App;
