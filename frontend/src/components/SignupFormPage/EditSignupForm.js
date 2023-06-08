import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function EditSignupForm() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState(sessionUser?.email || "");
  const [username, setUsername] = useState(sessionUser?.username || "");
  const [firstName, setFirstName] = useState(sessionUser?.firstName || "");
  const [lastName, setLastName] = useState(sessionUser?.lastName || "");
  const [password, setPassword] = useState(sessionUser?.password || "");
  
  const [confirmPassword, setConfirmPassword] = useState(sessionUser?.confirmPassword || "");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;




const handleSubmit = (e) => {
  e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);

      const payload = {
        ...sessionUser,  
        firstName,
        lastName,
        username,
        email,
        password,
      }
     dispatch(sessionActions.updateUser(payload))


      .then((sessionUser) => history.push(`/`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        console.log(data.errors, "DATAAA for ERRORSSS");
      });
    }


  };

console.log("HELLLOOOO ******* ******", )
  const handleClick = () => {
    history.replace('/login')
  }
  // useEffect((errors) => { HOW DO I POP UP A HIDDEN LOGIN BUTTON WHEN THE USER ALREADY EXISTS
  //   errors.forEach((error, idx) => {
  //     if(error === 'user email or username already exists') {

  //     }
  //   })
  // }, [errors])
  return (
    <div className='home-form'>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (

            <li key={idx}>{error}</li>
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
        <button className="formbuttons" id='signupButton' type="submit">Submit</button>
        {/* <button className="formbuttons" id='loginButton' onClick={handleClick}>Log In</button> */}
      </form>
    </div>
  );
}

export default EditSignupForm;
