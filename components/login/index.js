import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState('Login');

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email, password,
    };
    axios({
      url: 'http://localhost:4000/users/login',
      method: 'POST',
      data,
      withCredentials: true,
    })
      .then((res) => {
        setMessage(res.data.message);
        if (res.statusText === 'OK') {
          window.location = 'http://localhost:3000/';
        }
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  return (
    <div className={styles.container}>
      <h1 id={styles.loginMsg}>{ message }</h1>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          <div><input type="email" className={styles.input} id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} /></div>
          <div><input type="password" className={styles.input} id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} /></div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
