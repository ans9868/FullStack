import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import {useEffect} from "react";

const useLogin = (username, password, setUser, setUsername, setPassword, setErrorMessage) => {
        const handleLogin = async (event) => {
            event.preventDefault()
            console.log(event.payload)
            console.log(`Username ${username} \nPassword ${password}`)
            try {
                const user = await loginService.login({
                    username,
                    password,
                })

                window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
                blogService.setToken(user.token)
                setUser(user)
                setUsername('')
                setPassword('')
            } catch (exception) {
                setErrorMessage('wrong credentials')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [setUser])

    return handleLogin
}

export default useLogin