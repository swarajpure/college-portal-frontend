import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const baseUiUrl = process.env.NEXT_PUBLIC_BASE_UI_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [role, setRole] = useState('');
  const [url, setUrl] = useState('assignments');

  const selectPage = (role) => {
    if (role === 'teacher') setUrl('submissions');
  };

  useEffect(() => {
    axios.get('/users/self', { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(1);
        setRole(res.data.role);
        selectPage(role);
      })
      .catch((err) => console.log(err));
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
            <span id={styles.projectName}>
              {' '}
              College Portal!
            </span>
          </p>
        </h1>
        { isLoggedIn
          ? (
            <div className={styles.grid}>
              <a href={`${baseUiUrl}`} className={styles.card}>
                <h3>Home &rarr;</h3>
                <p>Home sweet home!</p>
              </a>

              <a href={`${baseUiUrl}/posts`} className={styles.card}>
                <h3>Posts &rarr;</h3>
                <p>All the posts go here!</p>
              </a>
              <a href={`${baseUiUrl}/${url}`} className={styles.card}>
                <h3>Assignments &rarr;</h3>
                <p>All the assignments and submissions here!</p>
              </a>
            </div>
          )
          : (
            <div className={styles.grid}>
              <a href={`${baseUiUrl}/register`} className={styles.card}>
                <h3>Register &rarr;</h3>
                <p>Make an account to create your identity!</p>
              </a>

              <a href={`${baseUiUrl}/login`} className={styles.card}>
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
