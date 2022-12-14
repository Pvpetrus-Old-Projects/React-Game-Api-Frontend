import React from 'react';
import PropTypes from 'prop-types';
import styles from './login.module.css';

const Login = (props) => (
  <div className={styles.Login}>
    <p>Login Component</p>
    <button onClick={ () => props.changePage("Register")}>
      Go to the registration page
    </button>
  </div>
);

Login.propTypes = {
  whichPage: PropTypes.string
};

Login.defaultProps = {};

export default Login;
