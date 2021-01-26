import Head from 'next/head';
import Posts from '../components/posts';
import postsData from '../mock/posts.json';
import Navbar from '../components/navbar';

const displayPosts = () => (
  <div>
    <Head>
      <title>Posts</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />
    <Posts postsList={postsData} />
  </div>
);

export default displayPosts;
