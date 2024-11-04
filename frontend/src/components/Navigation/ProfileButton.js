// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!e.target.closest(".profileButton")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/login");
  };

  const editProfile = (e) => {
    e.preventDefault();
    history.push(`/users/${user.id}/edit`);
  };

  console.log(user, "USER IN PROFILE BUTTON");
  return (
    <div className="profileButton">
      {user.previewImage ? (
        <button  onClick={openMenu}  >
          <img className="nav-profile-pic" src={user.previewImage} alt="Profile" />
        </button>
      ) : (
        <button onClick={openMenu}>
          Profile <i className="fa-solid fa-user"></i>
        </button>
      )}

      {showMenu && (
        <ul className="profile-dropdown">
          <li className="listItem">{user.username}</li>
          <li className="listItem">{user.email}</li>
          <li className="listItem">
            <button onClick={logout}>Log Out</button>
          </li>
          <li className="listItem">
            <button onClick={editProfile}>Edit Profile</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
