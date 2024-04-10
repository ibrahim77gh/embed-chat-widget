// App.js
import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import logo from './android-icon-72x72.png';
import close from './cross.png';
// import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import '../src/custom-chat-widget.css';
function App({ chatbot_id='fa8b23ec-9fbc-4d46-8221-8bf33129adf8' }) {
  // dcdc9b8e-1699-4dc2-aee6-4a5db516649f
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState('Default Title');
  const [subtitle, setSubtitle] = useState('Default Subtitle');
  const [chatbot, setChatbot] = useState({});

  const getChatbotData = async (chatbot_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/chatbot/${chatbot_id}/`)
      setChatbot(response.data)
      if (response.data.title) setTitle(response.data.title);
      if (response.data.subtitle) setSubtitle(response.data.subtitle);
      if (response.data.initial_message) addResponseMessage(response.data.initial_message);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChatbotData(chatbot_id);
  }, []);

  const handleNewUserMessage = async (newMessage) => {

    const userChatMessage = {
      role: 'user',
      content: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userChatMessage]);
    
    // Now send the message through the backend API
    const body = {
      messages: messages,
      chatbot_id: chatbot_id,
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
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="App">
      <Widget  
        // launcherCloseImg={close}
        // launcherOpenImg={logo}
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
