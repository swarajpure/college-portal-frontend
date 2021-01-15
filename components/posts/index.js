import { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/users/self', { withCredentials: true })
      .then((res) => {
        setAuthor(res.data.name);
        setRole(res.data.role);
        console.log('res', res.data);
      })
      .catch((err) => {
        alert(`${err.response.data.message}`);
        window.location = 'http://localhost:3000/login';
        console.log('error', err.response.data.message);
      });
  }, []);
  console.log(author);
  const submitHandler = (e) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:4000/posts/create',
      method: 'POST',
      data: { author, content },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        document.getElementById('message').innerText = res.data.message;
      })
      .catch((err) => console.log(err));
  };

  const changeContent = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };
  console.log(content);
  useEffect(() => {
    axios.get('http://localhost:4000/posts/', { withCredentials: true })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createPost = () => (
    <div className="container">
      <h1 id="message">Create Post</h1>
      <input id="content" type="text" placeholder="Enter your message here!" onChange={changeContent} />
      <button type="submit" onClick={submitHandler}>Post</button>
      <style jsx>
        {`
                    .container {
                        text-align: center;
                        padding: 20px;
                        margin: 2% 35%;
                        border: 1px solid #f4f4f4;
                        border-radius: 10px;
                        box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.65);
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                    }
                    
                    #content {
                        border: 0.5px solid #ccc;
                        border-radius: 5px;
                        padding: 10px;
                        padding-left: 10px;
                        margin: 0 auto;
                        margin-bottom:15px;
                        display: block;
                        font-size: 1rem;
                        width: 40%;
                    }

                    button {
                        margin: 0 auto;
                        display: block;
                        width: 40%;
                        padding: 10px;
                        border-radius: 1px;
                        text-decoration: none;
                        border: none;
                        box-shadow: 0 0 15px -7px rgba(0,0,0,.65);
                        background-color: limegreen;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                `}
      </style>
    </div>
  );
  const DisplayPost = posts.map((post) => (
    <div className="postBody">
      <div className="contentAndAuthor">
        <div className="content">
          {post.content}
        </div>
        <div className="author">
          {post.author}
        </div>
      </div>
      <div className="date">
        {post.date}
      </div>
      <style jsx>
        {`
                        .postBody {
                            display: flex;
                            justify-content: space-between;
                            padding: 20px;
                            margin: 2% 25%;
                            border: 1px solid #f4f4f4;
                            border-radius: 10px;
                            box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.65);
                        }

                        .contentAndAuthor{
                            margin-left: 20px;
                        }

                        .content{
                            font-size: 1.5rem;
                            font-weight: bold;
                        }
                        
                        
                    `}
      </style>
    </div>
  ));

  return (
    <div>
      { role === 'teacher' ? createPost() : ''}
      <div className="allPosts">
        { DisplayPost }
        <style jsx>
          {`
                .allPosts {
                    margin-top: 4%;
                }
                `}
        </style>
      </div>
    </div>
  );
};

export default Posts;
