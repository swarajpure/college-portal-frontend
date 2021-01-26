import Head from 'next/head';
import Submissions from '../components/submissions';
import Navbar from '../components/navbar';

const viewSubmissions = () => (
  <div>
    <Head>
      <title>Submissions</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />
    <Submissions />
  </div>
);

export default viewSubmissions;
