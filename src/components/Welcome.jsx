import React from 'react';
import robot from "../assets/robot.gif";

export default function Welcome({currentUser}) {
  return (
    <div className="welcome-page">
        <img src={robot} alt="robot-img" />
        <h1>
            Welcome,<span>{currentUser.username}</span>
        </h1>
        <h3>Please select a chat to start messaging</h3>
    </div>
  )
}
