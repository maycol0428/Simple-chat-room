import React from "react";
import Image from "./Image";
const ChatMessage = ({
  message: {
    body,
    fileName,
    type,
    ownedByCurrentUser,
    user: { name },
  },
}) => {
  if (type === "file") {
    const blob = new Blob([body], { type: type });
    if (ownedByCurrentUser) {
      return (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{name}</p>
          <div className="messageBox backgroundBlue">
            <Image blob={blob} fileName={fileName}></Image>
          </div>
        </div>
      );
    } else {
      return (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <Image blob={blob} fileName={fileName}></Image>
          </div>
          <p className="sentText pl-10 ">{name}</p>
        </div>
      );
    }
  }
  if (ownedByCurrentUser) {
    return (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{name}</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">{body}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{body}</p>
        </div>
        <p className="sentText pl-10 ">{name}</p>
      </div>
    );
  }
};

export default ChatMessage;
