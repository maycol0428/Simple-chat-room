import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
import Indicator from "./Indicator";
import InfoBar from "./InfoBar";
import Messages from "./Messages";
import NewMessageForm from "./NewMessageForm";
import "../../css/input.css";
import "../../css/messages.css";
import "../../css/message.css";
import useTyping from "../hooks/useTyping";
const ChatRoom = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const { room, name } = useParams();
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const [typingUsers, setTypingUsers] = useState([]);

  const url = "";

  useEffect(() => {
    socketRef.current = io(url, {
      query: { room, name },
    });
    setUser({
      name,
    });

    socketRef.current.on("allUsers", ({ users }) => {
      setUsers(users);
      console.log(users);
    });
    socketRef.current.on("send messages", (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    socketRef.current.on("start typing message", (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => [...users, user]);
      }
    });
    socketRef.current.on("stop typing message", (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const user = typingInfo.user;
        setTypingUsers((users) => users.filter((u) => u.name !== user.name));
      }
    });
  }, [room, name]);

  const startTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("start typing message", {
      senderId: socketRef.current.id,
      user,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("stop typing message", {
      senderId: socketRef.current.id,
      user,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!socketRef.current) return;

    if (!newMessage) {
      return;
    }
    cancelTyping();
    if (file) {
      const messageObject = {
        senderId: socketRef.current.id,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name,
        user,
      };
      setFile();
      socketRef.current.emit("send messages", messageObject);
    } else {
      const messageObject = {
        senderId: socketRef.current.id,
        type: "text",
        body: newMessage,
        user,
      };
      socketRef.current.emit("send messages", messageObject);
    }
    setNewMessage("");
  };

  function selectFile(e) {
    if (typeof e.target.files[0] !== "undefined") {
      setNewMessage(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      return null;
    }
  }
  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} typingYsers={typingUsers} />
        <NewMessageForm
          selectFile={selectFile}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          handleSendMessage={handleSendMessage}
          handleStartTyping={startTyping}
          handleStopTyping={stopTyping}
        ></NewMessageForm>
      </div>
      <Indicator users={users} />
    </div>
  );
};

export default ChatRoom;
