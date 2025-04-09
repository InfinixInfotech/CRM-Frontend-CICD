import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="relative bottom-16  right-6 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="h-40 p-2 text-gray-600">
            <p>👋 Hello! How can I assist you today?</p>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
