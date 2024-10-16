import { useRef, useState, useEffect } from 'react';
import Togglable from './Togglable.jsx';

const Blog = ({ blog, handleAddLike, handleDelete }) => {
    const blogRef = useRef();
    const [localLikes, setLocalLikes] = useState(blog.likes);

    const handleLocalLike = () => {
        setLocalLikes(localLikes + 1); // Update local UI for likes
        handleAddLike(blog); // Dispatch the like action to Redux

        if (blogRef.current) {
            blogRef.current.show()
        } else {
            console.error("blogRef.current is null or undefined");
        }
    };

    return (
        <div data-testid="aBlogPost">
            {blog.title}
            <div data-testid="postAuthor"> {blog.author} </div>
            <Togglable buttonLabel="view" ref={blogRef}>
                {blog.url}
                <br />
                <div data-testid="postLikes"> Likes: {localLikes} </div>
                <button onClick={handleLocalLike}> Like!</button>
                <br />
                {blog.user.name} <br />
                <button onClick={() => handleDelete(blog)}>Delete</button> <br />
            </Togglable>
        </div>
    );
};

export default Blog;
