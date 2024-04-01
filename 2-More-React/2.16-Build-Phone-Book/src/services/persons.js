import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons' //
//const baseUrl = 'http://localhost:3001/api/persons'

const baseUrl = '/api/persons' // this only added so it works for the production build when the /dist folder (when ready for distribution) is moved into the backend folder , essentailly since the backend/front end are in the same folder they can access each other locally


//app.use(express.static('dist')) //need to add this to the backend so that the frontend can access the path of the api relatively (like above), if the path is not done relatively it is blocked by the CORS security system (since the bakcend/frontend are not in the same path it can create security vunerabilities)


/*
If want to remove coors problem id allow for requests from all origins add the code below. Should not be for deployment, only for testing
Should be added to backend
const cors = require('cors')

app.use(cors())
 */


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (newObject) => {
    console.log("in update person")
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject) //update the url here and remove newObject
    // const request = axios.put(baseUrl, newObject) //update the url here and remove newObject
    console.log("updated person")
    return request.then(response => response.data)
}

const onDelete = (id) => {
    console.log("in delete person")
    const request = axios.delete(`${baseUrl}/${id}`) // anxios . delete takes the full url
    console.log("deleted person")
    return request.then(response => response.data)
}


export default { getAll, create, update, onDelete }
