// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded, setIsLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="">
        <div className="navList">
         { console.log(sessionUser, "SESSION USERRRRRR")}
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-buttons">
        <NavLink id="login-button" to="/login">
          Log In
        </NavLink>

        <NavLink id="signup-button" to="/signup">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <>
      <header id="main-header">
        <h1> JAM PACKED SOUND CLOUD</h1>
        <div id="mylinks">
          <a href="https://github.com/Cbakes24/SoundCloud-Project">
            <button>
              GitHub <i class="fa-brands fa-github"></i>
            </button>
          </a>
          <br></br>

          <a href="https://www.linkedin.com/in/cory-baker-9738ba2a/">
            <button>
              LinkedIn <i class="fa-brands fa-linkedin"></i>
            </button>
          </a>
        </div>
      </header>

      <nav id="navbar">
       
          <div className="navList">
            <div className="listItem">
              {" "}
              <NavLink activeClassName="active" exact to="/">
                Home
              </NavLink>
            </div>
            <div className="listItem">
              {" "}
              <NavLink activeClassName="active" to="/comments">
                Feed
              </NavLink>
            </div>
            <div className="listItem">
              <NavLink activeClassName="active" exact to="/songs">
                Songs
              </NavLink>
            </div>
            <div className="listItem">
              <NavLink activeClassName="active" exact to="/albums">
                Albums
              </NavLink>
            </div>
            <div className="listItem">
              <NavLink activeClassName="active" exact to="/gallery">
                Gallery
              </NavLink>
            </div>
            {sessionUser ? (
              <div className="listItem">
                <NavLink
                  activeClassName="active"
                  exact
                  to={`/songs/users/${sessionUser.id}`}
                >
                  My Songs
                </NavLink>{" "}
              </div>
            ) : null}

            <div className=""> {isLoaded && sessionLinks}</div>
          </div>
        
      </nav>
    </>
  );
}

export default Navigation;
