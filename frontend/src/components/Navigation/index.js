// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SongsList from '../Songs/SongsList';

import './Navigation.css';

function Navigation({ isLoaded, setIsLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser, "SESSION USERRR")
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>

       <NavLink  activeClassName="active" exact to={`/songs/users/${sessionUser.id}`}>My Songs</NavLink>
      <ProfileButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>

      </>
    );
  }

  return (
    <ul>
      <li className='navList'>
        <NavLink activeClassName="active" exact to="/">Home</NavLink>
        <NavLink  activeClassName="active" to="/comments">Comments</NavLink>
        <NavLink  activeClassName="active" exact to="/songs">Songs</NavLink>

        <section>
           {isLoaded && sessionLinks}
        </section>

        {/* <NavLink to={`/user/${sessionUser.id}/songs`}>My Profile</NavLink> */}
      </li>
    </ul>
  );
}

export default Navigation;
