import { useDispatch } from 'react-redux'
import { editFilter } from "../reducers/filterReducer.js";

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(editFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter