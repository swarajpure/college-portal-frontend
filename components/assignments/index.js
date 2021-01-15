import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './Assignments.module.css';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/users/self', { withCredentials: true })
      .catch((err) => {
        alert(err.response.data.message);
        window.location = 'http://localhost:3000/login';
      });

    axios.get('http://localhost:4000/assignments', { withCredentials: true })
      .then((res) => {
        setAssignments(res.data);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const { id } = e.target.parentElement;
    const link = e.target[0].value;
    const body = { id, link };
    axios({
      url: 'http://localhost:4000/assignments/submit',
      method: 'POST',
      data: body,
      withCredentials: true,
    })
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  const displayAssignments = assignments.map((assignment) => {
    const {
      id, title, description, createdOn, deadline, from,
    } = assignment;
    return (
      <div className={styles.assignment} key={id} id={id}>
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
        <form id="form-message" onSubmit={submitHandler}>
          <input type="url" className={styles.input} placeholder="Submit your assignment's drive link:" />
          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
        <div className="msg">{message}</div>
      </div>
    );
  });

  return (
    <div>
      {displayAssignments}
    </div>
  );
};

export default Assignments;
