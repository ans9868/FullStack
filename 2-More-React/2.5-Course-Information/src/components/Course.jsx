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
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map(part => <Part key={part.id} part={part}/>)}
            </ul>
            <b>Total of {SumExercises(course)} exercises</b>
        </div>
    )
}

export default Course
