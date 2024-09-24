import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  //createBlog as input
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [URL, setURL] = useState([])

  const addBLog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: URL,
      likes: 0,
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }
  //todo: make the <input ... /> for the tiel author url into a component to reuse code
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={addBLog}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={title}
            name={'Title'}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            name={'Author'}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url
          <input
            data-testid="url"
            type="text"
            value={URL}
            name={'URL'}
            onChange={({ target }) => setURL(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
