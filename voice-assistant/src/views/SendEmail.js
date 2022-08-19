import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SendEmail({ message }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [bool, setBool] = useState(false);
  const [banner, setBanner] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name,
        email,
        newMessage: newMessage.length > 0 ? newMessage : message,
      };
      setBool(true);
      // "proxy": "http://localhost:5000",
      // "proxy": "https://voice-assistant-jo.herokuapp.com",
      const res = await axios.post("/send", data);
      if (name.length === 0 || email.length === 0 || newMessage.length === 0) {
        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);
      } else if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);
        //reinitialize
        setName("");
        setEmail("");
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit
  return (
    <div>
      <header className="header">
        <Link className="back" to="/">Back</Link>
        <h2>Send Message By Email</h2>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <p>{banner}</p>
        <div>
          <input
            type="text"
            onChange={handleName}
            placeholder="Enter your name"
            value={name}
            required
          />
        </div>
        <div>
          <input
            type="email"
            onChange={handleEmail}
            placeholder="Enter your Email"
            value={email}
            required
          />
        </div>
        <div>
          <textarea type="text" onChange={handleMessage}>
            {message}
          </textarea>
        </div>
        <div>
          <input type="submit" value="send" />
          {bool ? " Sending..." : ""}
        </div>
      </form>
    </div>
  );
}
