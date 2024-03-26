// App.js
import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import logo from './logo.svg';
import 'react-chat-widget/lib/styles.css';

function App({ title, subtitle }) {
  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}

export default App;
