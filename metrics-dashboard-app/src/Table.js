import * as React from 'react';
import { getWeek } from  'date-fns'

export default function MetricTable(props) {

  const { numberOfOnboardings } = props
  
  let dateOfOnboarding = numberOfOnboardings.map((data) => {
    return data.date
  })

  let convertDateOfOnboarding = dateOfOnboarding.map((date) => {
    return new Date(date.seconds * 1000)
  })

  
  // get each persons number of onboarding
  let eachPersonsNumberOfOnboarding = numberOfOnboardings.map((data) => {
    return data.onboardingRemaining
  })
  console.log(eachPersonsNumberOfOnboarding)
  
  // put the corresponding week and each persons number of onboarding into an object
  let correspondingWeekAndEachPersonsNumberOfOnboarding = []
  for (let i = 0; i < convertDateOfOnboarding.length; i++) {
    correspondingWeekAndEachPersonsNumberOfOnboarding.push({
      email: numberOfOnboardings[i].email,
      week: getWeek(convertDateOfOnboarding[i]),
      onboarding: eachPersonsNumberOfOnboarding[i]
    })
  }
  console.log({correspondingWeekAndEachPersonsNumberOfOnboarding})
  
  if (dateOfOnboarding) {
    let correspondingWeek = convertDateOfOnboarding.map((date) => {
      return getWeek(date)
    })
    if (correspondingWeek === correspondingWeekAndEachPersonsNumberOfOnboarding) {
      console.log('same')
    }
  }

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
        <th>Email</th>
        {weekArray.map((week, index) => {
          return (
              <th>{week}</th>
          )
        })}
        {correspondingWeekAndEachPersonsNumberOfOnboarding.map((data, index) => {
          return (
            <tr>
              <td>{data.email}</td>
              <td>{data.week}</td>
              <td>{data.onboarding}</td>
            </tr>
          )
        })}
      </table>

      <div>
        <form>
        <input type={'text'} placeholder={'Email'} />
        <input type={'text'} placeholder={'Week'} />
        <input type={'text'} placeholder={'Number of Onboardings'} />
        <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

// TO DO - 
// I want to render this table with the data from the DB - DONE 
// I want it to adhere to a week view - each column is 1 week 
// I want to be able to add/update data onto this form

// Getting the current date and finding the current week based on that date using the getWeek() - 8
// With 8, need to run this through a function that will construct an array of strings
// Inside this function we need to run a loop where the [i] is a string literal e.g. Week 1, Week 2, etc this needs to be in an array of strings
// With the array, map over it and return <TableCell>'Week 1' </TableCell>

// Logic for insertings a person value in the right column
// When mapping through the object, grab date from the object and pass it to the getweek()