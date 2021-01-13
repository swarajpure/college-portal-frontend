import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const Submissions = () => {
  const [submissions, setsubmissions] = useState([]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:4000/submissions', { withCredentials: true })
    .then((res) => {
      setsubmissions(res.data)})
    .catch ((err) => { console.log(err)})

    axios.get('http://localhost:4000/users/self', {withCredentials: true})
    .then(res => {
      setUserData(res.data)
    })
    }, []);

  const showSubmissions = submissions.map(submission => {
    const {id, title, description, createdOn, deadline, from, submissions} = submission 
    return(
      <div className="submission" key={id} id={id}>
        <h2 className="title"> {title}</h2>
        <div><b>Description: </b>{description}</div>
        <div><b>From:</b> {from}</div>
        <div><b>Created On: </b>{createdOn}</div>
        <div><b>Deadline: </b>{deadline}</div>
        <div><b>Submissions:</b></div>
        {submissions.map(submission => {
          return(
            <li><ul>{submission.name} : <a href={submission.link}>{submission.link}</a></ul></li>
          )
        })}
        
        <style jsx>{`
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
    )
  })

  return(
    <div>{showSubmissions}</div>
  )
  }

export default Submissions;