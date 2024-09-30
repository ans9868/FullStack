const useLogout =() => {
    const handleLogout = async (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.localStorage.clear()
    }
    return handleLogout
}

export default useLogout