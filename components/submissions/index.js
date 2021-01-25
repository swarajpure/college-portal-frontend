import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './Submissions.module.css';

const Submissions = () => {
  const baseUiUrl = process.env.NEXT_PUBLIC_BASE_UI_URL;
  const [submissions, setsubmissions] = useState([]);
  const [message, setMessage] = useState('Create a new assignment');
  const [boolNew, setBoolNew] = useState(false);

  useEffect(() => {
    axios.get('/users/self', { withCredentials: true })
      .catch((err) => {
        alert(err.response.data.message);
        window.open(`${baseUiUrl}/login`, '_self');
      });

    axios.get('/submissions', { withCredentials: true })
      .then((res) => {
        setsubmissions(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
        window.open(`${baseUiUrl}`, '_self');
      });
  }, [boolNew]);

  const sortedSubmissions = [].concat(submissions);
  sortedSubmissions.sort((a, b) => b.timeStamp - a.timeStamp);

  const showSubmissions = sortedSubmissions.map((submission) => {
    const {
      id, title, description, createdOn, deadline, from, submissions,
    } = submission;
    return (
      <div className={styles.submission} key={id} id={id}>
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
          <li className={styles.li}>
            <ul className={styles.ul}>
              {submission.name}
              {' '}
              :
              {' '}
              <a className={styles.a} href={submission.link}>{submission.link}</a>
            </ul>
          </li>
        ))}
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
      url: '/submissions/create',
      method: 'POST',
      data,
      withCredentials: true,
    })
      .then((res) => {
        setMessage(res.data.message);
        if (res.statusText === 'OK') {
          const bool = boolNew;
          setBoolNew(!bool);
        }
      });
  };

  return (
    <div>
      <div className={styles.createAssignment}>
        <div><h2 id="message">{message}</h2></div>
        <div>
          <form onSubmit={submitHandler}>
            <div><input className={styles.input} type="text" placeholder="Title" id="title" /></div>
            <div><input className={styles.input} type="text" placeholder="Description" id="description" /></div>
            <div><input className={styles.input} type="text" placeholder="Deadline" id="deadline" /></div>
            <button className={styles.submitBtn} type="submit">Submit</button>
          </form>
        </div>
      </div>
      {showSubmissions}
    </div>
  );
};

export default Submissions;
