//2.3
const Part = ({part}) =>{
    return (
        <ul>{part.name} {part.exercises}</ul>
    )
}

const SumExercises = ({parts}) => {
    //let sum = 0;
    console.log(parts)
    // parts.forEach(function (part, index) {
    //     sum += part.exercises
    // });

    const sum = parts.reduce((accumulator, currentValue) =>  accumulator + currentValue.exercises, 0)
    console.log("Sum", sum)
    return sum;
}

const Course = ({course}) => {
    console.log(course)
    console.log(SumExercises(course))
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => <Part key={part.id} part={part}/>)}
            </ul>
            <b>Total of {SumExercises(course)} exercises</b>
        </div>
    )
}
//<p><b>Total of {SumExercises(parts = course.parts)} exercises</b></p>
const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return <Course course={course}/>
}

export default App
