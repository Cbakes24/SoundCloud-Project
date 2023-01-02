import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;




const handleSubmit = (e) => {
  e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          username,
          email,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }

    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);


  };

const history = useHistory()
  const handleClick = () => {
    history.replace('/login')
    console.log('hi')
  }
  // useEffect((errors) => { HOW DO I POP UP A HIDDEN LOGIN BUTTON WHEN THE USER ALREADY EXISTS
  //   errors.forEach((error, idx) => {
  //     if(error === 'user email or username already exists') {

  //     }
  //   })
  // }, [errors])
  return (
    <div className='signupDiv'>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (

            <li key={idx}>{error}, {console.log(error)}</li>
            ))}
        </ul>
        <label className="label">
          First Name
          <input
            className="input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Last Name
          <input
            className="input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Email
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Username
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Confirm Password
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button id='signupButton' type="submit">Sign Up</button>
        <button id='loginButton' onClick={handleClick}>Log In</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
