import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
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
        selectPage(res.data.role);
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
              <Link href="/">
                <div className={styles.card}>
                  <h3>Home &rarr;</h3>
                  <p>Home sweet home!</p>
                </div>
              </Link>

              <Link href="/posts">
                <div className={styles.card}>
                  <h3>Posts &rarr;</h3>
                  <p>All the posts go here!</p>
                </div>
              </Link>

              <Link href={`/${url}`}>
                <div className={styles.card}>
                  <h3>Assignments &rarr;</h3>
                  <p>All the assignments and submissions here!</p>
                </div>
              </Link>
            </div>
          )
          : (
            <div className={styles.grid}>
              <Link href="/register">
                <div className={styles.card}>
                  <h3>Register &rarr;</h3>
                  <p>Make an account to create your identity!</p>
                </div>
              </Link>

              <Link href="/login">
                <div className={styles.card}>
                  <h3>Login &rarr;</h3>
                  <p>Login to access all the features!</p>
                </div>
              </Link>

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
