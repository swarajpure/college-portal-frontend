import Posts from '../../components/posts'
import postsData from '../../mock/posts.json'

const displayPosts = () => {
    return (
        <div>
            <Posts postsList={postsData}/>
        </div>
    )
    
}

export default displayPosts