import React, { useEffect, useState, useRef } from "react";
import { FaCommentDots, FaTimes, FaUserAlt } from "react-icons/fa";
import "./FloatingChat.css";
import { useDispatch, useSelector } from "react-redux";
// import { CreateChatUrl, empCode, getAllEmpCodeNameUrl, staticToken } from "../Redux/Services/apiServer/ApiServer";
import "./FloatingChat.css"
import { emp, getAllChatsUrl, getAllEmpCodeNameUrl, getChatByToAndFromUrl, postChatUrl, staticToken } from "../../Redux/Services/apiServer/ApiServer";


const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [allEmployeeCodes, setAllEmployeeCodes] = useState([]);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const dispatch = useDispatch();
    // const { data, loading, error } = useSelector((state) => state.sendMail);
    const chatContainerRef = useRef(null);
    const chatMessagesRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredEmployees = allEmployeeCodes.filter(employee =>
        employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const savedEmpCode = emp;
    const [chatData, setChatData] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [totalMessageCount, setTotalMessageCount] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [notificationList, setNotificationList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [messageCounts, setMessageCounts] = useState();
    const [chatCounts, setchatCounts] = useState();
    const [previousTotalMessages, setpreviousTotalMessages] = useState(0);



    const fetchChats = async () => {
        try {
            const response = await fetch(
                `${getAllChatsUrl}`
            );
            const result = await response.json();
            setchatCounts(result);

            if (Array.isArray(result)) {
                const filtered = result.filter((chat) => chat.emp === savedEmpCode);
                const newTotalCount = result.length;

                // Count messages per employee
                const newMessageCounts = {};
                result.forEach(chat => {
                    if (chat.from !== savedEmpCode) {
                        if (chat.to == savedEmpCode) {
                            newMessageCounts[chat.from] = (newMessageCounts[chat.from] || 0) + 1;
                        }
                    }
                });

                setMessageCounts(newMessageCounts);
                setTotalMessageCount(newTotalCount);
                setChatData(result);
                setFilteredChats(filtered);
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    // useEffect(() => {
    //     if (Notification.permission !== "granted") {
    //         Notification.requestPermission().then((permission) => {
    //             console.log("Notification Permission:", permission);
    //         });
    //     }

    //     fetchChats();
    //     const interval = setInterval(fetchChats, 5000);
    //     return () => clearInterval(interval);
    // }, [totalMessageCount]);

    const handleNotificationClick = () => {
        setUnreadMessages(0); // Reset unread count when clicked
        setExpanded(!expanded);
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setMessage(" ");
        }
    };

    const handleCancelFile = () => {
        setFile(null);
    };



    const isAtBottom = () => {
        if (chatMessagesRef.current) {
            const { scrollHeight, scrollTop, clientHeight } = chatMessagesRef.current;
            return scrollHeight - scrollTop === clientHeight;
        }
        return false;
    };


    // Function to scroll to the bottom of the chat container
    const scrollToBottom = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scroll({
                top: chatMessagesRef.current.scrollHeight,
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    // Auto scroll to bottom when chat history changes, but only if already at the bottom
    useEffect(() => {
        if (isAtBottom()) {
            scrollToBottom();
        }
    }, [chatHistory]);

    // Check if the user is at the bottom of the chat


    // Fetch employee data (only once on component mount)
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(getAllEmpCodeNameUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${staticToken}`,
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                if (result && Array.isArray(result.data) && result.data.length > 0) {
                    setAllEmployeeCodes(result.data);
                } else {
                    setAllEmployeeCodes([]);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
                setAllEmployeeCodes([]);
            }
        };
        fetchEmployeeData();
    }, []);

    const fetchChatHistory = async (from, to) => {
        //setChatHistory([]); // Clear previous history
        try {
            const sentResponse = await fetch(`${getChatByToAndFromUrl}?from=${from}&to=${to}`);
            const receivedResponse = await fetch(`${getChatByToAndFromUrl}?from=${to}&to=${from}`);

            const sentData = await sentResponse.json();
            const receivedData = await receivedResponse.json();

            let combinedChat = [];

            if (sentData.success) {
                combinedChat = [...sentData.data];
            }

            if (receivedData.success) {
                combinedChat = [...combinedChat, ...receivedData.data];
            }

            if (combinedChat.length > 0) {
                combinedChat.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort messages by timestamp
                setChatHistory(combinedChat);
            }
        } catch (err) {
            console.error("Error fetching chat history:", err);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleSendMessage();
        }
      };
    // Call scrollToBottom after the message has been sent and chat history is updated
    const handleSendMessage = async () => {
        if (!file) {
            if (!message || !selectedEmployee) {
                alert("Please select a contact and enter a message.");
                return;
            } else {
                setMessage("...");
            }
        }

        const formData = new FormData();
        formData.append("To", selectedEmployee.employeeCode);
        formData.append("From", emp);
        formData.append("Message", message);

        if (file) {
            formData.append("Attachment", file);
        }



        try {
            const response = await fetch(`${postChatUrl}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${staticToken}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            console.log("Message Sent", data);

            // Update chat UI immediately
            const newMessage = {
                from: emp,
                to: selectedEmployee.employeeCode,
                message: message,
                attachment: file ? URL.createObjectURL(file) : null, 
                timestamp: new Date().toISOString(),
            };

            // Append the new message to the current chat history
            setChatHistory(prevHistory => [...prevHistory, newMessage]);

            // Clear input fields
            setMessage('');
            setFile(null);

            // Scroll to the latest message if the user is at the bottom
            if (isAtBottom()) {
                scrollToBottom();
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    // Handling employee selection and fetching chat history
    const handleEmployeeSelect = (employee) => {
        setChatHistory([])
        setSelectedEmployee(employee);
        setIsOpen(true);
        fetchChatHistory(emp, employee.employeeCode);
    };

    // Fetch chat history periodically every 5 seconds when the user is chatting
    useEffect(() => {
        let intervalId;
        if (selectedEmployee) {
            intervalId = setInterval(() => {
                fetchChatHistory(emp, selectedEmployee.employeeCode);
            }, 5000);
        }
        return () => clearInterval(intervalId);
    }, [selectedEmployee]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSelectedEmployee(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // Auto scroll to bottom when chat history changes
    useEffect(() => {
        if (isAtBottom()) {
            scrollToBottom();
        }
    }, [chatHistory]);

    // Function to render attachments
    const renderAttachment = (attachment) => {
        const handleDownload = () => {
            const blob = new Blob([new Uint8Array(atob(attachment.fileData).split('').map(c => c.charCodeAt(0)))], { type: attachment.contentType });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank'); // Open the Blob URL in a new tab
        };

        if (attachment.contentType.startsWith('image/')) {
            // Render image attachment with specific width and height
            return (
                <div className="attachment">
                    <img
                        src={`data:${attachment.contentType};base64,${attachment.fileData}`}
                        alt={attachment.fileName}
                        className="attachment-image"
                        style={{ width: '200px', height: '160px', objectFit: 'cover' }} // Set width and height here
                        onClick={handleDownload} // Open in new tab on click
                    />
                </div>
            );
        } else if (attachment.contentType.startsWith('video/')) {
            // Render video attachment with specific width and height
            return (
                <div className="attachment">
                    <video controls style={{ width: '200px', height: '160px' }} onClick={handleDownload}> {/* Set width and height for the video */}
                        <source src={`data:${attachment.contentType};base64,${attachment.fileData}`} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        } else {
            // For other attachment types, render a clickable link
            return (
                <div className="attachment">
                    <a
                        href="#"
                        onClick={handleDownload} // Open the file in new tab on click
                    >
                        Download {attachment.fileName}
                    </a>
                </div>
            );
        }
    };





    function countNewMessages(chatCounts = [], savedEmpCode) {
        if (!Array.isArray(chatCounts)) {
            console.error("chatCounts is not an array:", chatCounts);
            return { newMessageCounts: {}, hasNewMessages: false, totalMessages: 0 };
        }

        let newMessageCounts = {};
        let hasNewMessages = false;
        let totalMessages = 0;

        chatCounts.forEach(chat => {
            if (chat && chat.from && chat.to && chat.to === savedEmpCode) {
                newMessageCounts[chat.from] = (newMessageCounts[chat.from] || 0) + 1;
            }
        });

        totalMessages = Object.values(newMessageCounts).reduce((sum, count) => sum + count, 0);

        return { newMessageCounts, hasNewMessages, totalMessages };
    }



    const result = countNewMessages(chatCounts, savedEmpCode);



    // Function to show browser notification
    const showNotification = (newMessageCount) => {
        if (Notification.permission === "granted" && newMessageCount > 0) {
            new Notification("New Messages", {
                body: `You have ${newMessageCount} new messages.`,
            });
        }
    };

    // Function to count new messages
    function countNewMessages(chatCounts = [], savedEmpCode) {
        if (!Array.isArray(chatCounts)) {
            console.error("chatCounts is not an array:", chatCounts);
            return { newMessageCounts: {}, hasNewMessages: false, totalMessages: 0 };
        }

        let newMessageCounts = {};
        let totalMessages = 0;

        chatCounts.forEach(chat => {
            if (chat && chat.from && chat.to && chat.to === savedEmpCode) {
                newMessageCounts[chat.from] = (newMessageCounts[chat.from] || 0) + 1;
            }
        });

        totalMessages = Object.values(newMessageCounts).reduce((sum, count) => sum + count, 0);

        return { newMessageCounts, totalMessages };
    }

    // Function to handle message count updates
    const updateMessages = (chatCounts, savedEmpCode) => {
        const result = countNewMessages(chatCounts, savedEmpCode);

        // console.log("Total Messages:", result.totalMessages);

        // Check if the total messages count has increased
        if (result.totalMessages > previousTotalMessages) {
            showNotification(result.totalMessages - previousTotalMessages);
        }

        setpreviousTotalMessages(result.totalMessages)
    };

    // Request notification permission on page load
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
    }


// console.log(result.totalMessages);
// console.log(previousTotalMessages);



    useEffect(() => {
        updateMessages(chatCounts, savedEmpCode);
    }, result.totalMessages)




    return (
        <div className="floating-chat-container">
            {!isOpen && !selectedEmployee && (
                <button
                    style={{
                        //position: "fixed",
                        bottom: "50px",
                        right: "50px",
                        backgroundColor: "#2c3e50",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer"
                    }}
                    onClick={() => setIsOpen(true)}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"

                        }}
                    >
                        {result.totalMessages > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "-10px",
                                    backgroundColor: "red",
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    borderRadius: "50%",
                                    width: "16px",
                                    height: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                                }}
                            >
                                {result.totalMessages}
                            </span>
                        )}
                        <FaCommentDots style={{ fontSize: "26px" }} />
                    </div>
                </button>


            )}

            {isOpen && !selectedEmployee && (
                <div className="employee-list" ref={chatContainerRef}>

                    <input
                        type="text"
                        placeholder="Search employee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        style={{ marginBottom: "20px", height:"28px", fontSize:"14px" }}
                    />
                    {[...filteredEmployees]
                        .sort((a, b) => (messageCounts[b.employeeCode] || 0) - (messageCounts[a.employeeCode] || 0)) // Sort by message count
                        .map((employee, index) => (
                            <div
                                key={index}
                                className="employee-item"
                                onClick={() => handleEmployeeSelect(employee)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: "10px"}}
                            >
                                <div className="employee-info" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="profile-icon" style={{ marginRight: '10px', fontSize: "18px"}}>
                                        {employee.profileImage ? (
                                            <img
                                                src={employee.profileImage}
                                                alt="Profile"
                                                className="profile-image"
                                            />
                                        ) : (
                                            <FaUserAlt />
                                        )}
                                    </div>
                                    <p className="employee-name" style={{fontSize: "14px"}}>{employee.employeeName}</p>
                                </div>

                                {/* Message Count in Row */}
                                {messageCounts[employee.employeeCode] > 0 && (
                                    <span
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            borderRadius: '12px',
                                            padding: '2px 6px',
                                            fontSize: '12px',
                                            marginLeft: '8px',
                                            minWidth: '20px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {messageCounts[employee.employeeCode]}
                                    </span>
                                )}
                            </div>
                        ))}



                </div>
            )}

            {selectedEmployee && (
                <div className="chat-box">
                    <div className="chat-header">
                        <span>Chat with {selectedEmployee.employeeName}</span>
                        <button className="close-button" onClick={() => {
                            setSelectedEmployee(null);
                            setIsOpen(false);
                        }}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="chat-body">
                        {/* {loading && <p>Loading...</p>} */}
                        {/* {error && <p>Error: {error}</p>} */}

                        <div className="chat-messages">
                            {chatHistory.length > 0 ? (
                                chatHistory.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`chat-message ${msg.from === emp ? "sent" : "received"}`}
                                    >
                                        <p>{msg.message}</p>
                                        {Array.isArray(msg?.attachment) ? (
                                            msg.attachment.map((attachment, idx) => (
                                                <div key={idx}>{renderAttachment(attachment)}</div>
                                            ))
                                        ) : (
                                            console.log("msg.attachment is not an array", msg?.attachment)
                                        )}

                                        <span style={{ color: "#f8f8f8", fontSize: 10 }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No messages yet...</p>
                            )}
                        </div>
                    </div>

                    <div className="chat-footer">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message"
                        ></textarea>

                        <div className="action-icons">
                            <label htmlFor="file-upload" className="file-upload-label">
                                <i className="fa fa-paperclip"></i> {/* FontAwesome icon */}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*,video/*,application/*"
                                style={{ display: "none" }}
                            />

                            {file && (
                                <div className="file-preview">
                                    <span className="file-name">{file.name}</span>
                                    <button className="cancel-file" onClick={handleCancelFile}>
                                        ✖
                                    </button>
                                </div>
                            )}

                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default FloatingChat;
