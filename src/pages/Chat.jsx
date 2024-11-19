import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoadind, setIsLoading] = useState(true);

  useEffect(() => {
    async function settingCurrentUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    settingCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io.connect(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/SetAvatar");
        }
      }
    }
    fetchUserData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setIsLoading(false);
    console.log(chat);
  };
  return (
    <div className="chat-page">
      <div className="chat-container">
        {currentUser ? (
          <>
            <Contact
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : !isLoadind ? (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Chat;
