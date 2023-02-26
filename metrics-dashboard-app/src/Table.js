import * as React from 'react';
import { getWeek } from  'date-fns'

export default function MetricTable(props) {

  const { numberOfOnboardings } = props
  
  numberOfOnboardings.map((person) => {
    console.log(person)
  })
  

  const getCurrentDate = new Date()
  const currentWeek = getWeek(getCurrentDate)
  console.log(currentWeek)

  const weekArray = []
  for (let i = 1; i <= currentWeek; i++) {
    weekArray.push(`Week ${i}`)
  }
  console.log(weekArray)

  return (
    <div>
      <table>
        {weekArray.map((week, index) => {
          return (
              <th>{week}</th>
          )
        })}

      </table>
    </div>
  )
}

// TO DO - 
// I want to render this table with the data from the DB
// I want it to adhere to a week view - each column is 1 week
// I want to be able to add/update data onto this form

// Getting the current date and finding the current week based on that date using the getWeek() - 8
// With 8, need to run this through a function that will construct an array of strings
// Inside this function we need to run a loop where the [i] is a string literal e.g. Week 1, Week 2, etc this needs to be in an array of strings
// With the array, map over it and return <TableCell>'Week 1' </TableCell>

// Logic for insertings a person value in the right column
// When mapping through the object, grab date from the object and pass it to the getweek()
//