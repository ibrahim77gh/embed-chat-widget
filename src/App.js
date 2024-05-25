import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage, deleteMessages } from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import '../src/custom-chat-widget.css';

// chatbot_id = '2253365a-0638-4f96-81bd-86750cde12d9'
function App({ chatbot_id }) {
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState('Default Title');
  const [subtitle, setSubtitle] = useState('Powered by Chattly');
  const [chatbot, setChatbot] = useState({});
  const [sessionId, setSessionId] = useState('');
  const [waitingResponse, setWaitingResponse] = useState(false); // New state variable

  const generateSessionId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    getChatbotData(chatbot_id);
  }, []);

  const getChatbotData = async (chatbot_id) => {
    try {
      // const response = await axios.get(`http://127.0.0.1:8000/chatbot/${chatbot_id}/`);
      const response = await axios.get(`https://chattly.syedibrahim.net/chatbot/${chatbot_id}/`);

      setChatbot(response.data);
      if (response.data.name) setTitle(response.data.name);
      if (response.data.subtitle) setSubtitle(response.data.subtitle);
      if (response.data.initial_message) addResponseMessage(response.data.initial_message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewUserMessage = async (newMessage) => {
    if (waitingResponse) {
      deleteMessages(1)
      return;
    } // Check if waiting for response, then exit function

    setWaitingResponse(true); // Set waiting for response

    const userChatMessage = {
      role: 'user',
      content: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userChatMessage]);

    const body = {
      session_id: sessionId,
      chatbot_id: chatbot_id,
      query: newMessage,
    };

    try {
      // const response = await axios.post('http://127.0.0.1:8000/conversation/', body);
      const response = await axios.post('https://chattly.syedibrahim.net/conversation/', body);

      addResponseMessage(response.data.response);
      const responseChatMessage = {
        role: 'assistant',
        content: response.data.response,
      };
      setMessages((prevMessages) => [...prevMessages, responseChatMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setWaitingResponse(false); // Reset waiting for response
    }
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={"https://chattly-bkt-1.s3.amazonaws.com/assets/android-icon-72x72.png"}
        title={title}
        subtitle={subtitle}
        emojis={true}
        toggleInputDisabled={waitingResponse}
      />
    </div>
  );
}

export default App;
