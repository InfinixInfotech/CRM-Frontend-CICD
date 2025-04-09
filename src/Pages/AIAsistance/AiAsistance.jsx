import React, { useState, useEffect, useRef } from "react";
import "./AIAssistant.css";
import AIImage from "../../assests/ai.png"

const AIAssistant = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  const [bodyContent, setBodyContent] = useState(
    `<p><strong> Purpose of AI Usage</strong><br />

</p>
`
  );


  const getAnswer = async (msg) => {
    const googleApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    const googleApiKey = "AIzaSyD7vzctptaQUzVdrFqQKBEJhEKnS_js5pc";
    setIsTyping(true);

    try {
      const googleRequest = {
        contents: [{ parts: [{ text: msg }] }],
      };
      const response = await fetch(`${googleApiUrl}?key=${googleApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleRequest),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response received.";
        setChatHistory((prev) => [...prev, { message: botMessage, isSender: false }]);
      } else {
        console.error("Error fetching response:", response.statusText);
      }
    } catch (error) {
      console.error("Exception:", error);
    }
    setIsTyping(false);
    scrollToBottom();
  };

  const handleSend = () => {
    if (message) {
      setChatHistory((prev) => [...prev, { message, isSender: true }]);
      setMessage("");
      getAnswer(message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 300);
  };

  useEffect(scrollToBottom, [chatHistory]);

  return (
    <div className="main-container d-flex justify-content-center align-items-center">
    <div className="row-container">
      {/* Left Container */}
      <div className="chat-container w-100">
        <div className="chat">
          <div className="chat-body" ref={scrollRef}>
            {/* Check if chatHistory has data */}
            {chatHistory.length === 0 ? (
              <div className="no-chat ">
                <img src={AIImage} alt="No chat available" className="Image-Ai" />
                <h4 className="text-white mt-4">No Chats Available</h4>
                <p className="text-white ">Start a conversation to see chat history.</p>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${chat.isSender ? "sent" : "received"}`}
                >
                  {chat.message}
                </div>
              ))
            )}
            {isTyping && <div className="chat-bubble typing text-white">Typing...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
            />
            <button type="submit" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AIAssistant;
