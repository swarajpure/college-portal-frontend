import { useEffect } from 'react';
import axios from 'axios';

const signout = () => {
  const baseUiUrl = process.env.NEXT_PUBLIC_BASE_UI_URL;
  useEffect(() => {
    axios.get('/users/signout', { withCredentials: true })
      .then(window.location = `${baseUiUrl}`);
  }, []);
  return (<></>);
};

export default signout;
