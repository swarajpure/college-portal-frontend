import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Posts.module.css';

const Posts = () => {
  const baseUiUrl = process.env.NEXT_PUBLIC_BASE_UI_URL;
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('Create Post');

  useEffect(() => {
    axios.get('/posts/', { withCredentials: true })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get('/users/self', { withCredentials: true })
      .then((res) => {
        setAuthor(res.data.name);
        setRole(res.data.role);
      })
      .catch((err) => {
        alert(`${err.response.data.message}`);
        window.location = `${baseUiUrl}/login`;
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios({
      url: '/posts/create',
      method: 'POST',
      data: { author, content },
      withCredentials: true,
    })
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const createPost = () => (
    <div className={styles.container}>
      <h1>{message}</h1>
      <input id={styles.content} type="text" placeholder="Enter your message here!" onChange={changeContent} />
      <button type="submit" className={styles.submitBtn} onClick={submitHandler}>Post</button>
    </div>
  );

  const DisplayPost = posts.map((post) => (
    <div className={styles.postBody}>
      <div className={styles.contentAndAuthor}>
        <div className={styles.content}>
          {post.content}
        </div>
        <div className="author">
          {post.author}
        </div>
      </div>
      <div className="date">
        {post.date}
      </div>
    </div>
  ));

  return (
    <div>
      { role === 'teacher' ? createPost() : ''}
      <div className={styles.allPosts}>
        { DisplayPost }
      </div>
    </div>
  );
};

export default Posts;
