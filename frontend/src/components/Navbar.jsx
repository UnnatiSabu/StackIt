import React from "react";
import "./Navbar.css";

function Navbar({ theme, toggleTheme, isLoggedIn, userProfile }) {
  return (
    <nav className="navbar">
      <div className="logo">StackIt</div>
      
      <div className="right-section">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
        
        {isLoggedIn ? (
          <div className="user-profile">
            <img 
              src={userProfile.avatar || `https://ui-avatars.com/api/?name=${userProfile.name}&background=random`} 
              alt="Profile" 
              className="profile-pic"
            />
            <span className="profile-name">{userProfile.name}</span>
          </div>
        ) : (
          <button className="login-btn">Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;