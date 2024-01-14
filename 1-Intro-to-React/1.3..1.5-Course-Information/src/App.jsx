

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

const Part = ({name, exercises}) => {
    // console.log(name)
    // console.log(exercises)
    return (
           <p>
               {name} {exercises}
           </p>
    )
}

const Content = (arrOfParts) =>{ //using "prop" as an example
    return (
        <div>
            <Part name={arrOfParts.props[0].name} exercises={arrOfParts.props[0].exercises} />
            <Part name={arrOfParts.props[1].name} exercises={arrOfParts.props[1].exercises} />
            <Part name={arrOfParts.props[2].name} exercises={arrOfParts.props[2].exercises} />
        </div>
    )
}

// eslint-disable-next-line react/prop-types
const Total = (arrOfParts) =>{
    return (
        <div>
            <p> Number of exercises {arrOfParts.props[0].exercises + arrOfParts.props[1].exercises + arrOfParts.props[2].exercises }</p>
        </div>
    )
}
//
// const App = () => {
//     const course = 'Half Stack application development'
//     const part1 = 'Fundamentals of React'
//     const exercises1 = 10
//     const part2 = 'Using props to pass data'
//     const exercises2 = 7
//     const part3 = 'State of a component'
//     const exercises3 = 14
//
//     return (
//         <div>
//             <Header  course={course} />
//             <Content part={part1} numExc={exercises1} />
//             <Content part={part2} numExc={exercises2} />
//             <Content part={part3} numExc={exercises3} />
//             <Total exercises1={exercises1} exercises2={exercises2}  exercises3={exercises3} />
//         </div>
//     )
// }
const App = () => {
     const course = {
     name : 'Half Stack application development',
     parts : [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]
     }

    return (
        <div>
            <Header  course={course.name} />
            <Content props={course.parts}  />
            <Total props={course.parts} />
        </div>
    )
}
export default App
