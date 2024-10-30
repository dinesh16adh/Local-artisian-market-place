import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { assets } from '../assets/assets';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "How can I help you?" }]);
      playNotificationSound();
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const playNotificationSound = () => {
    const audio = new Audio(assets.notificationSound);
    audio.play();
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!isNameSet) {
      setUserName(input);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: `Hello ${input}! How can we assist you today?` }]);
      setIsNameSet(true);
      setInput("");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = getBotResponse(input);
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    setInput("");
  };

  const getBotResponse = (input) => {
    const responses = {
      help: "I'm here to help! What do you need assistance with?",
      products: "You can browse our products by category or use the search bar.",
      return: "You can return any item within 30 days of purchase.",
      shipping: "We offer free shipping on orders over $50.",
      payment: "We accept various payment methods including credit cards and PayPal.",
      discount: "Check our promotions page for current discounts and offers.",
      contact: "You can contact us at support@example.com.",
      feedback: "We appreciate your feedback! Please let us know how we can improve.",
      "order status": "You can check your order status in your account section.",
      "size guide": "Refer to our size guide on the product page for accurate measurements.",
      "gift cards": "Gift cards are available for purchase on our website.",
    };

    const lowerInput = input.toLowerCase();
    for (const keyword in responses) {
      if (lowerInput.includes(keyword)) {
        return { sender: "bot", text: responses[keyword] };
      }
    }

    return { sender: "bot", text: "I'm sorry, I didn't understand that. Can you please clarify?" };
  };

  const toggleChatbot = () => setIsOpen(!isOpen);

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1 }}>
      {!isOpen && (
        <div onClick={toggleChatbot} style={chatHeadStyle}>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '11px', textAlign: 'center' }}>Chat with us</h2>
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
          <div style={chatContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
              </div>
            ))}
          </div>
          {isNameSet ? (
            <>
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                style={inputStyle}
              />
              <button onClick={handleSend} style={sendButtonStyle}>Send</button>
            </>
          ) : (
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="What can I call you?"
              style={inputStyle}
            />
          )}
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
  width: "85vw", // Adjusts for smaller screens
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
  height: "200px",
  overflowY: "auto",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  border: "1px solid #ccc",
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
