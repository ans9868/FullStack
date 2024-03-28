import axios from 'axios'
const baseUrl = 'https://3-10-fullstack-vs-1.azurewebsites.net/api/persons'
// const baseUrl = 'http://localhost:3001/api/persons'




const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const onDelete = (id) => {
    console.log("in delete person")
    const request = axios.delete(`${baseUrl}/${id}`) // anxios . delete takes the full url
    console.log("deleted person")
    return request.then(response => response.data)
}


export default { getAll, create, onDelete }
