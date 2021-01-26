import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const signout = () => {
  const router = useRouter();
  const baseUiUrl = process.env.NEXT_PUBLIC_BASE_UI_URL;
  useEffect(() => {
    axios.get('/users/signout', { withCredentials: true })
      .then(router.push('/'));
  }, []);
  return (<></>);
};

export default signout;
