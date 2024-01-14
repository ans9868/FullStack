

//const Header = (prop) => {
const Header = ({course}) => {
    return (
        <div>
            <p>
                {course}
            </p>
        </div>
    )
}
const Content = (prop) =>{
    return (
        <div>
            <p>
                {prop.part} {prop.numExc}
            </p>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
const Total = ({exercises1, exercises2, exercises3}) =>{
    return (
        <div>
            <p> Number of exercises {exercises1 + exercises2 + exercises3 }</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header  course={course} />
            <Content part={part1} numExc={exercises1} />
            <Content part={part2} numExc={exercises2} />
            <Content part={part3} numExc={exercises3} />
            <Total exercises1={exercises1} exercises2={exercises2}  exercises3={exercises3} />
        </div>
    )
}

export default App
