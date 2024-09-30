//need finish useLogout hook
import useLogin from "../hooks/useLogin.js"
import useLogout from "../hooks/useLogout.js";

const LogoutForm = () => {
    const handleLogout = useLogout()

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
            </form>
        </div>
    )
}


export default LogoutForm