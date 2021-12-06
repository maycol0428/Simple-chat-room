import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatMessage from "./ChatMessage";
import "../../css/messages.css";
import TypingMessage from "./TypingMessage";
const Messages = ({ messages, typingYsers }) => {
  return (
    <ScrollToBottom className="messages">
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => {
            return (
              <div key={i}>
                <ChatMessage message={message} />
              </div>
            );
          })}
          {typingYsers.map((user, i) => {
            return (
              <div key={messages.length + 1}>
                <TypingMessage user={user} />
              </div>
            );
          })}
        </ol>
      </div>
    </ScrollToBottom>
  );
};

export default Messages;
