import { useEffect, useState } from 'react';
import Axios from "axios";

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:4000/users/self', {withCredentials : true})
        .then(res => setAuthor(res.data.name))
        .catch(err => console.log(err))
    }, []);
    console.log(author)
    const submitHandler = (e) => {
        e.preventDefault();
        Axios({
            url: 'http://localhost:4000/posts/create',
            method: 'POST',
            data: { author, content },
            withCredentials: true
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    const changeContent = (e) => {
        console.log(e.target.value)
        setContent(e.target.value)
    }
    console.log(content)
    return(
        <div className='container'>
            <input id='content' type='text' placeholder='Enter your message here!' onChange={changeContent}></input>
            <button type='submit' onClick={submitHandler}>Post</button>
            <style jsx>
                {`
                    .container {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;

                    }
                    
                    #content {
                        width: 40%;
                        margin: 5% auto 5% auto;
                        height: 40vh;
                        border-radius: 15px;
                        box-shadow: 0 0 15px -7px rgba(0,0,0,.65);
                        padding: 100px;
                    }

                    button {
                        width: 10%;
                        margin: 0 auto;
                    }
                `}
            </style>
        </div>
    )
}

export default CreatePost