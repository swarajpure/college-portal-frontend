import Head from 'next/head';
import Register from '../components/register';

export default function register() {
  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Register />
    </div>
  );
}
