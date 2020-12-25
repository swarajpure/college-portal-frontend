import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>College Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <p>Welcome to <span id={styles.projectName}>College Portal!</span></p>
        </h1>

        <div className={styles.grid}>
          <a href="http://localhost:3000/register" className={styles.card}>
            <h3>Register &rarr;</h3>
            <p>Make an account to create your identity!</p>
          </a>

          <a href="http://localhost:3000/register" className={styles.card}>
            <h3>Login &rarr;</h3>
            <p>Login to access all the features!</p>
          </a>
        </div>
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
  )
}
