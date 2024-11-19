import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";

export default function Contact({ contacts, currentUser,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const newContacts = Array.from(contacts);

  useEffect(() => {
    setCurrentUserImage(currentUser.AvatarImage);
    setCurrentUserName(currentUser.username);
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contact-container">
          <div className="brand">
            <img src={logo} alt="logo" />
            <h4>Random GC</h4>
          </div>
          <div className="contacts">
            {newContacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    currentSelected === index ? "selected-contact" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.AvatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentUserName}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
