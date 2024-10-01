import Blog from "./Blog.jsx";

const BlogList = ({blogs, handleAddLike, handleDelete} ) => {

    return (
        <div>
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => b.likes - a.likes) //sort here, -1 means put a first, 1 means put b first
                .map((blog) => (
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