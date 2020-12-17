import { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        axios.get('http://localhost:4000/posts/', { withCredentials: true}).
        then((res) => {
            console.log(res)
            setPosts(res.data)
            
        })
        .catch((err) => console.log(err))
    }, []);
    // console.log(posts)
    // const postsList = posts
    const DisplayPost = posts.map(post => {
        return(
            <div className='postBody'>
                <div className='contentAndAuthor'>
                    <div className='content'>
                        {post.content}
                    </div>
                    <div className='author'>
                        {post.author}    
                    </div>                    
                </div>
                <div className='date'>
                    {post.date}
                </div>
                <style jsx>
                    {`
                        .postBody {
                            display: flex;
                            justify-content: space-between;
                            padding: 20px;
                            margin: 2% 25%;
                            border: 1px solid #f4f4f4;
                            border-radius: 10px;
                            box-shadow: 1px 1px 15px -7px rgba(0, 0, 0, 0.65);
                        }

                        .contentAndAuthor{
                            margin-left: 20px;
                        }

                        .content{
                            font-size: 1.5rem;
                            font-weight: bold;
                        }
                        
                        
                    `}
                </style>
            </div>
        )
    } )

    return(
        <div className='allPosts'>
            HELLO
            { DisplayPost }
            <style jsx>
                {`
                .allPosts {
                    margin-top: 4%;
                }
                `}
            </style>
        </div>
        )
}

export default Posts