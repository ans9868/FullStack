import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content: content,
        id: getId(),
        votes: 0
    }

    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async (id) => {
    const current = await axios.get(`${baseUrl}/${id}`)

    const updateAnecdote = {
        ...current.data,
        votes: current.data.votes + 1
    }

    const response = await axios.patch(`${baseUrl}/${id}`, {votes: updateAnecdote.votes})
    console.log(response.data)
    return response.data
}

export default { getAll, createNew, vote }