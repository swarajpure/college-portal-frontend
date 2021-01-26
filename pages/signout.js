import { useEffect } from 'react';
import axios from 'axios';

const signout = () => {
  const homePage = process.env.NEXT_PUBLIC_BASE_UI_URL;
  useEffect(() => {
    axios.get('/users/signout', { withCredentials: true })
      .then((res) => {
        alert(res.data.message);
        window.location = homePage;
      });
  }, []);
  return (<></>);
};

export default signout;
