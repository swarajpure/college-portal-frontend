import { useEffect } from 'react';
import axios from 'axios';

const signout = () => {
  useEffect(() => {
    axios.get('http://localhost:4000/users/signout', { withCredentials: true })
      .then(window.location = 'http://localhost:3000')
      .catch((err) => console.error(err));
  }, []);
  return (<></>);
};

export default signout;
