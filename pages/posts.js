import Posts from '../components/posts'
import postsData from '../mock/posts.json'
import Navbar from '../components/navbar'

const displayPosts = () => {
    return (
        <div>
            <Navbar />
            <Posts postsList={postsData}/>
        </div>
    )
    
}

export default displayPosts