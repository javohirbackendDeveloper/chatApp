import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "./ChatOnline";
import Conversation from "./Conversation";
import Message from "./Message";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { ArrowBackIos } from "@mui/icons-material";
function Chat() {
  const [conversations, setconversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:5000"));

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.userID);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => user.some((u) => u.userID === f))
      );
    });
  }, [user]);

  useEffect(() => {
    if (user?.userID) {
      const getConversations = async () => {
        try {
          const res = await axios.get(
            "http://localhost:4000/api/conversation/" + user.userID
          );
          if (res.data[0]) {
            setconversations(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getConversations();
    }
  }, [user?.userID]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user.userID,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.userID
    );

    socket.current.emit("sendMessage", {
      senderId: user.userID,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (user?.userID) {
    return (
      <div className="chat">
        <Navbar />
        <div className="messenger">
          <div className="chatMenuWrapper">
            <div className="chatMenu">
              <input type="text" placeholder="search for friends" />
              {conversations.map((conver) => (
                <div onClick={() => setCurrentChat(conver)}>
                  <Conversation
                    key={conver}
                    conversation={conver}
                    currentUser={user}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBoxWrapper">
            <div className="chatBox">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.senderId === user.userID} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      placeholder="write something"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button onClick={handleSubmit}>Send</button>
                  </div>
                </>
              ) : (
                <span className="noConverText">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
          </div>
          <div className="chatOnlineWrapper">
            <div className="chatOnline">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user.userID}
                setCurrentChat={setCurrentChat}
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Message own={true} />
        <Message />
        <Message own={true} />
        <Message />
        <Message own={true} />
      </div>
    );
  }
}

export default Chat;
