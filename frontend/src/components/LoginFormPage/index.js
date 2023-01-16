import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

const handleDemoClick = (e) => {


setCredential('corybaker24')
setPassword('corysoloman')

//works but flashes that invalid login info, its submitting the login before the credentials are set to corybaker24
return dispatch(sessionActions.login({ credential, password })).catch(
  async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
  }
);
}

  return (
    <div className='home-form'>
      <h1>Login</h1>
       <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          className="input"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button className='formbuttons' type="submit">Log In</button>
      <button className='formbuttons'  onClick={handleDemoClick}>Demo Log In</button>


    </form>
    </div>

  );
}

export default LoginFormPage;
