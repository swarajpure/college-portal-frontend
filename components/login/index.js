import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const baseUiUrl = process.env.NEXT_PUBLIC_BASE_UI_URL;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState('Login');
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email, password,
    };
    axios({
      url: '/users/login',
      method: 'POST',
      data,
      withCredentials: true,
    })
      .then((res) => {
        setMessage(res.data.message);
        if (res.statusText === 'OK') {
          router.push('/posts');
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
          <div><input type="password" className={styles.input} id="password" placeholder="Enter password" required autoComplete="on" onChange={(e) => setPassword(e.target.value)} /></div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
