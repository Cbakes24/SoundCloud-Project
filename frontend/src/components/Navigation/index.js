// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SongsList from "../Songs/SongsList";

import "./Navigation.css";

function Navigation({ isLoaded, setIsLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser, "SESSION USERRR")
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="container">
        <NavLink
          activeClassName="active"
          exact
          to={`/songs/users/${sessionUser.id}`}
        >
          My Songs
        </NavLink>

        <li className="navList">
          {" "}
          <ProfileButton user={sessionUser} />
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="container">
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </div>
    );
  }

  return (
    <>
      <header id="main-header">
        <div className="'container">
          <h1> JAM PACKED SOUND CLOUD</h1>
          <li className="navList">
            {" "}
            <NavLink
              activeClassName="active"
              exact
              to="https://github.com/Cbakes24/SoundCloud-Project"
            >
              GitHub
            </NavLink>
          </li>
          <li className="navList">
            {" "}
            <NavLink
              activeClassName="active"
              exact
              to="https://www.linkedin.com/in/cory-baker-9738ba2a/"
            >
              GitHub
            </NavLink>
          </li>
        </div>
      </header>

      <nav id="navbar">
        <div className="container">
          <ul>
            <li className="navList">
              {" "}
              <NavLink activeClassName="active" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="navList">
              {" "}
              <NavLink activeClassName="active" to="/comments">
                Feed
              </NavLink>
            </li>
            <li className="navList">
              <NavLink activeClassName="active" exact to="/songs">
                Songs
              </NavLink>
            </li>
            <li className="navList"> {isLoaded && sessionLinks}</li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
