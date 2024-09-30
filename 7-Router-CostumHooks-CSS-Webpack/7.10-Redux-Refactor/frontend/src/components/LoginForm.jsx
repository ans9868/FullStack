import useLogin from "../hooks/useLogin.js";
import {useState} from "react";
const loginForm = ({setUser, setErrorMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = useLogin(username, password, setUser, setUsername, setPassword, setErrorMessage)
    return (
    <div>
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    data-testid="username"
                    type="username"
                    value={username}
                    name={'Username'}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    data-testid="password"
                    type="password"
                    value={password}
                    name={'Password'}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button data-testid="loginButton" type="submit">
                login
            </button>
        </form>
    </div>
)
}
export default loginForm