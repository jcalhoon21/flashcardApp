import React from "react";
import { Link } from 'react-router-dom';
import "./NavBarStyles.css";

const NavBar = () => {
  return(
    <div>
      <div className="navContainer">
        <div className="logo">Logo will go here</div>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/flashcards">Flashcards</Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar;