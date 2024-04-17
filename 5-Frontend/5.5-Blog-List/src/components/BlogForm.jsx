import { useState } from "react"

const BlogForm = ({ handleAddBlog }) => {
    const [newBlog, setNewBlog] = useState('')

    const [title, setTitle] = useState([])
    const [author, setAuthor] = useState([])
    const [URL, setURL] = useState([])

    const addBlog = (event) => {
        event.preventDefault()
        handleAddBlog( {
            title: title,
            author: author,
            url: URL,
        })

        setTitle('')
        setAuthor('')
        setURL('')
    }

    return (
        <div>
            <h2>Add Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    username
                    <input
                        type="text"
                        value={title}
                        name={"Title"}
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>

                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name={"Author"}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    url
                    <input
                        type="text"
                        value={URL}
                        name={"URL"}
                        onChange={({target}) => setURL(target.value)}
                    />
                </div>

                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm