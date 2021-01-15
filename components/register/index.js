import { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('Register');

  const selectRole = (selectedRole, bool) => {
    if (bool) setRole(`${selectedRole}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name, email, password, role,
    };
    axios({
      url: 'http://localhost:4000/users/register',
      method: 'POST',
      data,
      withCredentials: true,
    })
      .then((res) => {
        setMessage(res.data.message);
        if (res.statusText === 'OK') {
          window.location = 'http://localhost:3000/login';
        }
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  return (
    <div className={styles.container}>
      <h1 id={styles.registerMsg}>{ message }</h1>
      <div className={styles.form}>
        <form onSubmit={submitHandler}>
          <div><input type="text" className={styles.input} id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)} /></div>
          <div><input type="email" className={styles.input} id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} /></div>
          <div><input type="password" className={styles.input} id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} /></div>
          <div className={styles.roleText}>Enter Role:</div>
          <div className={styles.roleSelect}>
            <label htmlFor="role">
              Student
              <input name="role" type="radio" id="role" value="student" defaultChecked onChange={(e) => selectRole(e.target.value, e.target.checked)} />
            </label>

            <label htmlFor="role">
              Teacher
              <input name="role" type="radio" id="role" value="teacher" onChange={(e) => selectRole(e.target.value, e.target.checked)} />
            </label>
          </div>
          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
