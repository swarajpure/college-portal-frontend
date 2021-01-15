import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/users/self', { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data.message);
        window.location = 'http://localhost:3000/login';
      });
  }, []);

  axios.get('http://localhost:4000/assignments', { withCredentials: true })
    .then((res) => {
      setAssignments(res.data);
    })
    .catch((err) => { console.log(err); });

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
        alert(`${res.data.message}`);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const displayAssignments = assignments.map((assignment) => {
    const {
      id, title, description, createdOn, deadline, from,
    } = assignment;
    return (
      <div className="assignment" key={id} id={id}>
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
          <input type="url" placeholder="Submit your assignment's drive link:" />
          <button type="submit">Submit</button>
        </form>
        <style jsx>
          {`
              .assignment{
                padding: 20px;
                margin: 2% 25%;
                border: 1px solid #f4f4f4;
                border-radius: 10px;
                box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.65);
              }
              input {
                border: 0.5px solid #ccc;
                border-radius: 5px;
                padding: 10px;
                padding-left: 10px;
                margin: 10px 0;
                font-size: 1rem;
                width: 40%;
              }
              button {
                height: 40px;
                padding: 10px;
                border-radius: 1px;
                text-decoration: none;
                border: none;
                box-shadow: 0 0 15px -7px rgba(0,0,0,.65);
                background-color: #37ec1d;
                border-radius: 4px;
                cursor: pointer;
                margin-left: 10px;
              }
            `}
        </style>
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
