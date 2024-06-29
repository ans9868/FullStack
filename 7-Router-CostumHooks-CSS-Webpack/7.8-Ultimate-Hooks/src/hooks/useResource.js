import {useState, useEffect} from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = () => {
        axios.get(baseUrl)
            .then(r => {
            setResources(r.data)
            })
            .catch(error => {
                console.log(`Error caught in create: ${error}`)
            })
    }

    const create = async (resource) => {
        try {
            const r = await axios.post(baseUrl, resource)
            setResources(resources.concat(resource))
            return r.data
        } catch (error) {
            console.error(`Error creating resource ${error}`)
            throw error
        }
    }

    const service = {
        create
    }

    useEffect(() => {
        getAll()
    }, []) //empty dependency, only run on mount

    return [
        resources, service
    ]
}