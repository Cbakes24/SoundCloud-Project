// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/login')
  };
  const editProfile = (e) => {
    e.preventDefault();
    // dispatch(sessionActions.updateUser(user));
    history.push(`/users/${user.id}/edit`)
  };
  return (
    <>
      <button className='profileButton' onClick={openMenu}>Profile
      <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className='listItem'>{user.username}</li>
          <li className='listItem'>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
            <button onClick={editProfile}>Edit Profile</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
