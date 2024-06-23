const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  /*
   Need to make a NotificationContext that has a state value { display: BOOL, message: STRING } a
   NotificationContext should be in root of src/

   then can import with the following like this to the compnents

   import { useContext } from 'react'
  import { useCounterDispatch } from '../CounterContext

 finally need to make a function that when true it is set to false after 5 seconds

   */
  if (true) return null

  return (
    <div style={style}>

    </div>
  )
}

export default Notification
