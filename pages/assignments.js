import Head from 'next/head';
import Assignments from '../components/assignments';
import Navbar from '../components/navbar';

const viewAssignments = () => (
  <div>
    <Head>
      <title>Assignments</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />
    <Assignments />
  </div>
);

export default viewAssignments;
