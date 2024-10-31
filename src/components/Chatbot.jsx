import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaComments } from 'react-icons/fa';
import { assets } from '../assets/assets'; // Ensure you have the correct path to your assets

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const lastPopupTime = localStorage.getItem('lastPopupTime');
    const now = Date.now();

    if (!lastPopupTime || now - lastPopupTime >= 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        handleUserInteraction();
        localStorage.setItem('lastPopupTime', now.toString());
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const playNotificationSound = () => {
    document.body.click();
    const audio = new Audio(assets.notificationSound);
    audio.play().catch((error) => {
      if (error.name === 'NotAllowedError') {
        console.log("Audio playback blocked. Waiting for user interaction.");
      }
    });
  };

  const handleUserInteraction = () => {
    if (!isOpen) {
      setIsOpen(true);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "How can I help you?", time: new Date().toLocaleTimeString() }]);
      playNotificationSound();
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!isNameSet) {
      setUserName(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input, time: new Date().toLocaleTimeString() },
        { sender: "bot", text: `Hello ${input}! How can we assist you today?`, time: new Date().toLocaleTimeString() },
      ]);
      setIsNameSet(true);
      setInput("");
      return;
    }

    const userMessage = { sender: "user", text: input, time: new Date().toLocaleTimeString() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsTyping(true);
    const botResponse = getBotResponse(input);

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000); // Simulate typing delay

    setInput("");
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    const keywords = [
      { keyword: "shipping", response: "We offer standard, express, and international shipping options." },
      { keyword: "hi", response: "Hi there! How can I assist you?" },
      { keyword: "hello", response: "Hello! How can I assist you today?" },
      { keyword: "help", response: "I'm here to help! What would you like assistance with?" },
      { keyword: "product details", response: "Please click on a product to see its details, reviews, and specifications." },
      // Add more keywords and responses as needed
    ];

    for (const entry of keywords) {
      if (lowerInput.includes(entry.keyword)) {
        return { sender: "bot", text: entry.response, time: new Date().toLocaleTimeString() };
      }
    }

    return { sender: "bot", text: "I'm sorry, I didn't understand that. Can you please clarify?", time: new Date().toLocaleTimeString() };
  };

  const toggleChatbot = () => setIsOpen(!isOpen);
  const closeChatbot = () => setIsOpen(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1 }}>
      {!isOpen && (
        <div onClick={toggleChatbot} style={chatHeadStyle}>
          <FaComments size={24} color="#fff" />
        </div>
      )}

      {isOpen && (
        <div style={chatboxStyle}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: '16px', textAlign: 'center' }}>Chat with Us</h2>
            <button onClick={closeChatbot} style={closeButtonStyle}>
              <FaTimes size={14} color="#fff" />
            </button>
          </div>
          <div ref={chatContainerRef} style={chatContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
                <div style={{ fontSize: '10px', color: '#888' }}>{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div style={{ textAlign: 'left', fontStyle: 'italic', color: '#888' }}>
                Bot is typing...
              </div>
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={isNameSet ? "Type a message..." : "What can I call you?"}
            style={inputStyle}
          />
          {isNameSet && <button onClick={handleSend} style={sendButtonStyle}>Send</button>}
        </div>
      )}
    </div>
  );
};

const chatHeadStyle = {
  width: "45px",
  height: "45px",
  padding: "5px",
  backgroundColor: "#007bff",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const chatboxStyle = {
  width: "85vw",
  maxWidth: "320px",
  padding: "10px",
  backgroundColor: "#FAFAFA", 
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
};

const closeButtonStyle = {
  background: "red",
  border: "none",
  cursor: "pointer",
};

const chatContainerStyle = {
  height: "300px",
  overflowY: "auto",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const sendButtonStyle = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#007bff",
  color: "#fff",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

export default Chatbot;
