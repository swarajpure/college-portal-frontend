import { useEffect, useState } from 'react';
import Axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:4000/users/self', { withCredentials: true })
      .then((res) => {
        setAuthor(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(author);
  const submitHandler = (e) => {
    e.preventDefault();
    Axios({
      url: 'http://localhost:4000/posts/create',
      method: 'POST',
      data: { author, content },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        document.getElementById('message').innerText = res.message;
      })
      .catch((err) => console.log(err));
  };

  const changeContent = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };
  console.log(content);
  return (
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
};

export default CreatePost;
