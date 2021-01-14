import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const navbarContent = (title, url) => {
  const router = useRouter();
  const linkClasses = `${styles.link} ${router.pathname === url ? styles.active : ''}`;

  return(
      <Link href={url}>
        <p className={linkClasses}>{title}</p>
      </Link>
  )
};

const Navbar = () => {
  const [role, setRole] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/users/self', {withCredentials : true})
        .then(res => { 
            setRole(res.data.role)
            console.log('res', res.data)
        })
        .catch(err => { 
            console.log('error',err.response.data.message) })
    }, []);
  return(
  <div className={styles.navbar}>
    {navbarContent('Home', '/')}
    {navbarContent('Posts', '/posts')}
    { role === 'teacher' ? navbarContent('Submissions', '/submissions') : navbarContent('Assignments', '/assignments')}
    {navbarContent('Signout', '/signout')}
  </div>
  )
}

export default Navbar;