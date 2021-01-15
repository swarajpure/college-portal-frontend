import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';

const Submissions = () => {
  const [submissions, setsubmissions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/users/self', { withCredentials: true })
      .catch((err) => {
        alert(err.response.data.message);
        window.location = 'http://localhost:3000/login';
      });

    axios.get('http://localhost:4000/submissions', { withCredentials: true })
      .then((res) => {
        setsubmissions(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        window.location = 'http://localhost:3000/';
      });
  }, []);

  const showSubmissions = submissions.map((submission) => {
    const {
      id, title, description, createdOn, deadline, from, submissions,
    } = submission;
    return (
      <div className="submission" key={id} id={id}>
        <h2 className="title">
          {' '}
          {title}
        </h2>
        <div>
          <b>Description: </b>
          {description}
        </div>
        <div>
          <b>From:</b>
          {' '}
          {from}
        </div>
        <div>
          <b>Created On: </b>
          {createdOn}
        </div>
        <div>
          <b>Deadline: </b>
          {deadline}
        </div>
        <div><b>Submissions:</b></div>
        {submissions.map((submission) => (
          <li>
            <ul>
              {submission.name}
              {' '}
              :
              {' '}
              <a href={submission.link}>{submission.link}</a>
            </ul>
          </li>
        ))}
        <style jsx>
          {`
          .submission{
            padding: 20px;
            margin: 2% 25%;
            border: 1px solid #f4f4f4;
            border-radius: 10px;
            box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.65);
          }
          ul{
            margin: 0;
            padding-left: 10px;
          }
          li{
            margin-left: 20px;
          }
          a:hover{
            text-decoration: underline;
          }
        `}
        </style>
      </div>
    );
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    const deadline = e.target[2].value;
    const data = { title, description, deadline };
    axios({
      url: 'http://localhost:4000/submissions/create',
      method: 'POST',
      data,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        document.getElementById('message').innerText = res.data.message;
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Navbar />
      <div className="createAssignment">
        <div><h2 id="message">Create a new assignment</h2></div>
        <div>
          <form onSubmit={submitHandler}>
            <div><input type="text" placeholder="Title" id="title" /></div>
            <div><input type="text" placeholder="Description" id="description" /></div>
            <div><input type="text" placeholder="Deadline" id="deadline" /></div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <style jsx>
          {`
              .createAssignment{
                text-align: center;
                padding: 20px;
                margin: 2% 35%;
                border: 1px solid #f4f4f4;
                border-radius: 10px;
                box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.65);
              }
              input {
                border: 0.5px solid #ccc;
                border-radius: 5px;
                padding: 10px;
                padding-left: 10px;
                margin-bottom: 15px;
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
              button:hover{
                box-shadow: 1px 1px 18px -5px rgba(0,0,0,.65)
              }
            `}
        </style>
      </div>
      {showSubmissions}
    </div>
  );
};

export default Submissions;
