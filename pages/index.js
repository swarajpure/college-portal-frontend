import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [role, setRole] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    axios.get('http://localhost:4000/users/self', { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(1);
        setRole(res.data.role);
        res.data.role === 'student' ? setUrl('assignments') : setUrl('submissions');
        console.log('res', res.data);
      })
      .catch((err) => {
        console.log('error', err.response.data.message);
      });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>College Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <p>
            Welcome to
            <span id={styles.projectName}>College Portal!</span>
          </p>
        </h1>
        { isLoggedIn
          ? (
            <div className={styles.grid}>
              <a href="http://localhost:3000/" className={styles.card}>
                <h3>Home &rarr;</h3>
                <p>Home sweet home!</p>
              </a>

              <a href="http://localhost:3000/posts" className={styles.card}>
                <h3>Posts &rarr;</h3>
                <p>All the posts go here!</p>
              </a>
              <a href={`http://localhost:3000/${url}`} className={styles.card}>
                <h3>Assignments &rarr;</h3>
                <p>All about assignments!</p>
              </a>
            </div>
          )
          : (
            <div className={styles.grid}>
              <a href="http://localhost:3000/register" className={styles.card}>
                <h3>Register &rarr;</h3>
                <p>Make an account to create your identity!</p>
              </a>

              <a href="http://localhost:3000/login" className={styles.card}>
                <h3>Login &rarr;</h3>
                <p>Login to access all the features!</p>
              </a>

            </div>
          )}

      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/swarajpure"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Swaraj
        </a>
      </footer>
    </div>
  );
}
