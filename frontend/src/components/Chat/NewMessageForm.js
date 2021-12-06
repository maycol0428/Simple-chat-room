import React, { useState } from "react";
import sendIcon from "../../icons/sendIcon.png";
import attachIcon from "../../icons/attachIcon.png";
import emojiIcon from "../../icons/emojiIcon.png";
import "../../css/chat.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import useOutsideClick from "../hooks/useOutsideClick";
const NewMessageForm = ({
  selectFile,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleStartTyping,
  handleStopTyping,
}) => {
  const { showEmoji, setShowEmoji, ref, refButtonShow } = useOutsideClick(false);
  const handleEmojiShow = (e) => {
    e.preventDefault();
    setShowEmoji((v) => !v);
  };
  const handleEmojiSelect = (e) => {
    setNewMessage((newMessage) => (newMessage += e.native));
  };
  const handleNewMessageChange = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  return (
    <>
      <form className="form" onSubmit={handleSendMessage}>
        <textarea
          className="textarea"
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Say something..."
          onKeyPress={handleStartTyping}
          onKeyUp={handleStopTyping}
        />
        <label htmlFor="file-input">
          <div className="uploadButton">
            <img className="uploadImage" src={attachIcon} alt="uploadImage" />
          </div>
        </label>
        <input type="file" id="file-input" className="input" onChange={selectFile} />

        <button className="sendButton" onClick={handleEmojiShow} ref={refButtonShow}>
          <img className="uploadImage" src={emojiIcon} alt="uploadImage" />
        </button>
        <button className="sendButton">
          <img className="uploadImage" src={sendIcon} alt="uploadImage" />
        </button>
      </form>
      <div>
        {showEmoji && (
          <div ref={ref}>
            <Picker onSelect={handleEmojiSelect} emojiSize={20}></Picker>
          </div>
        )}
      </div>
    </>
  );
};

export default NewMessageForm;
