import '../styles/globals.css';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
