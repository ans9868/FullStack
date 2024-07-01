import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

//do a put for the likes
const addLike = async (blogObject) => {
  const newBlogObject = {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: blogObject.likes + 1,
  }

  const response = await axios.put(`${baseUrl}/${blogObject.id}`, newBlogObject)
  return response.data
}

const remove = async (blogObject) => {
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.status === 204
}

export default { getAll, create, setToken, addLike, remove }
