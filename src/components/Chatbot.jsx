import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importing the close icon

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user's name
  const [isNameSet, setIsNameSet] = useState(false); // State to check if the name is set

  useEffect(() => {
    // Load messages from local storage when the component mounts
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to local storage whenever messages change
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = () => {
    if (!input.trim()) return; // Prevent empty messages

    if (!isNameSet) {
      setUserName(input);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: `Hello ${input}! How can we assist you today?` }]);
      setIsNameSet(true); // Set name has been provided
      setInput(""); // Clear input after setting name
      return; // Exit early after setting the name
    }

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = getBotResponse(input);
    setMessages((prevMessages) => [...prevMessages, botResponse]); // Only send bot response once

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
      // Add more responses as needed
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
    setIsOpen(false); // Just hide the chatbot
    // Do not clear messages or local storage
  };

  return (
    <div style={{ position: "fixed", bottom: "0", right: "20px", width: "300px", zIndex: 1000 }}>
      {/* Title to open the chatbot */}
      {!isOpen && (
        <div onClick={toggleChatbot} style={toggleButtonStyle}>
          <h2 style={{ margin: 0, color: '#fff' }}>Chat with Us</h2>
        </div>
      )}

      {isOpen && (
        <div style={chatboxStyle}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, textAlign: 'center' }}>Chat with Us</h2> {/* Title */}
            <button onClick={closeChatbot} style={closeButtonStyle}>
              <FaTimes size={16} color="#fff" /> {/* Close icon */}
            </button>
          </div>
          <div style={chatContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
              </div>
            ))}
            {!isNameSet && (
              <div style={{ textAlign: "left", margin: "5px 0" }}>
                <strong>Bot:</strong> What’s your name?
              </div>
            )}
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
              placeholder="What's your name?"
              style={inputStyle}
            />
          )}
        </div>
      )}
    </div>
  );
};

const toggleButtonStyle = {
  padding: "10px",
  margin: "-5px",
  backgroundColor: "#007bff",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "center",
};

const chatboxStyle = {
  padding: "10px",
  backgroundColor: "#FAFAFA", 
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "none", 
  padding: "10px",
  borderRadius: "8px",
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
  padding: "10px",
  marginBottom: "10px",
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
