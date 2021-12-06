import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../css/join.css";
const joinInitialForm = {
  name: "",
  room: "",
};

const Join = () => {
  const [form, setForm] = useState(joinInitialForm);
  const nav = useNavigate();
  const handleChangueForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    if (!form.name || !form.room) {
      return;
    }
    nav(`/chat/${form.room}/${form.name}`);
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="heading">Join</div>
        <div>
          <input placeholder="Name" name="name" value={form.name} onChange={handleChangueForm} className="joinInput" />
          <input placeholder="Room" name="room" value={form.room} onChange={handleChangueForm} className="joinInput mt-20" />
        </div>
        <button className="button mt-20" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Join;
