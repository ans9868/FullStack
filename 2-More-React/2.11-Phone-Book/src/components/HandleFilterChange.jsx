import React from "react"

const HandleFilterChange = ({filter, setFilter}) => {
    const filterChange = (event) => {
        setFilter(event.target.value)
    }
    return (
        <form>
            <div>
                filter shown with <input onChange={filterChange}/>
            </div>
        </form>
    )
}


export default HandleFilterChange