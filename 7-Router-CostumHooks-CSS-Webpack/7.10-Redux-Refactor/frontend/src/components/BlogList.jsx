import Blog from "./Blog.jsx";
import blogsReducer, {deleteBlog, addLike} from "../reducers/blogsReducer.js";
import {useDispatch, useSelector} from "react-redux";
const BlogList = () => {
    const { blogs, status } = useSelector((state) => state.blogs)

    const dispatch = useDispatch()

    const handleDelete = (blog) => {
        dispatch(deleteBlog(blog.id)); // Make sure blogId is passed correctly
    }

    const handleAddLike = (blog) => {
        dispatch(addLike(blog))
    }

    if (status === 'loading') {
        //todo: make it so wait 4 seconds before starting to load module so it doesn't 'randomly appear'
        return <div>Loading ... </div>
    }

    if (!blogs || blogs.length === 0 ){
        return <div>No blogs available</div>
    }

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>blogs</h2>
            {sortedBlogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleAddLike={handleAddLike}
                            handleDelete={handleDelete}
                        />
                ))}
        </div>
    )
}

export default BlogList