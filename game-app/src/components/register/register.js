import PropTypes from 'prop-types';
import styles from './register.module.css';
import React, {useState } from "react";

function Register(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    const newUser = { username: username, password: password};
    if(username==="")
    {
      console.log("Pusty username");
      return;
    }
    if(password==="")
    {
      console.log("Pusty hasło");
      return;
    }
    console.log("Utworzono użytkownika")
    props.newUser=newUser;
  };

  return(
    <div className={styles.Register}>
    <p>Register Component</p>
    <form action="" onSubmit={submitForm}>
        <div>
          <p htmlFor="username">username</p>
          <input
            type="username"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <p htmlFor="password">Password</p>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
    <button onClick={ () => props.changePage("Login")}>
      Go to the login page
    </button>
  </div>
  )
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
