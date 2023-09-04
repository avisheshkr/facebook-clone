import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import Onlinechat from "../../components/OnlineChat/Onlinechat";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const postMessage = async (e) => {
    e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentChat._id,
      sender: user._id,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/messages`,
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/conversations/${user._id}`
      );
      setConversations(res.data);
    };
    fetchConversations();
  }, [user._id]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/messages/${currentChat._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to latest
  }, [messages]);

  return (
    <div className="messenger">
      <div className="conversation">
        <div className="conversation__search">
          <input type="text" placeholder="Search for friends" />
        </div>
        <div className="conversation__chatheads">
          {conversations.map((c) => {
            return (
              <div
                key={c._id}
                onClick={() => setCurrentChat(c)}
                style={{ cursor: "pointer" }}
              >
                <Conversation conversation={c} currentUser={user} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="message-container">
        {currentChat ? (
          <>
            <div className="message">
              {messages.map((m) => {
                return (
                  <Message
                    key={m._id}
                    message={m.text}
                    own={m.sender === user._id ? true : false}
                    userId={m.sender}
                    time={m.createdAt}
                    scrollRef={scrollRef}
                  />
                );
              })}
            </div>
            <form className="message__input" onSubmit={postMessage}>
              <div>
                <textarea
                  placeholder="Write message...."
                  rows="4"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <span></span>
              </div>
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <h2>Open a conversation to start a chat.</h2>
        )}
      </div>
      <Onlinechat />
    </div>
  );
};

export default Messenger;
