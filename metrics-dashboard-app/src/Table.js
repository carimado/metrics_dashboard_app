import "./Table.css";
import * as React from "react";
import { getWeek } from "date-fns";
import TableInput from './TableInput';
import { useEffect, useState } from "react";

export default function MetricTable({ numberOfOnboardings, isOpen, handleCloseClick, onSaveComplete }) {
  const [isCardOpen, setIsCardOpen] = useState(isOpen);

  const handleCardCollapse = () => {
    setIsCardOpen(!isCardOpen);
    handleCloseClick();
  };

  // NOTE: Loops through numberOfOnboardings passed as props
  // - Finds employees with the same email and sets it to the array
  // - Else it creates a new employee object and adds it to the array
  const employees = [];

  for (let i = 0; i < numberOfOnboardings.length; i++) {
    let report = numberOfOnboardings[i];
    
    let employee = employees.find((e) => {
      let dates = []
      for (let item in report) {
        console.log(item)
        dates.push(item.e)
      }
      console.log(dates)
      return e.email === report.email;
    });
    if (!employee) {
      employee = {
        email: report.email,
        numberPerWeek: {},
        date: report.date,
        latestNumber: 0
      };

      employees.push(employee);
    }

    // NOTE: Sets number of onboardingRemaining for the week using library and Firebase
    // - Key (numberPerWeek), Value (onboardingRemaining)
    const week = getWeek(new Date(report.date.seconds * 1000));
    employee.numberPerWeek[week] = report.onboardingRemaining;
  }


  // NOTE: Returns the date in the numberOfOnboardings
  let dateOfOnboarding = numberOfOnboardings.map((data) => {
    return data.date;
  });

  // NOTE: Converts the above to an actual date instead of nanoseconds and seconds
  let convertDateOfOnboarding = dateOfOnboarding.map((date) => {
    return new Date(date.seconds * 1000);
  });

  // NOTE: Returns the numberOfOnboardings remaining for each person
  let eachPersonsNumberOfOnboarding = numberOfOnboardings.map((data) => {
    return data.onboardingRemaining;
  });

  // NOTE: Creates object pushes to the array
  let correspondingWeekAndEachPersonsNumberOfOnboarding = [];
  for (let i = 0; i < convertDateOfOnboarding.length; i++) {
    correspondingWeekAndEachPersonsNumberOfOnboarding.push({
      email: numberOfOnboardings[i].email,
      week: getWeek(convertDateOfOnboarding[i]),
      onboarding: eachPersonsNumberOfOnboarding[i],
    });
  }

  // NOTE: Checks if corresponding week is equal to the array above
  if (dateOfOnboarding) {
    let correspondingWeek = convertDateOfOnboarding.map((date) => {
      return getWeek(date);
    });
    if (
      correspondingWeek === correspondingWeekAndEachPersonsNumberOfOnboarding
    ) {
      console.log("same");
    }
  }

  // NOTE: Creates an array of week numbers and mapped in JSX
  const getCurrentDate = new Date();
  const currentWeek = getWeek(getCurrentDate);

  const weekArray = [];
  for (let i = 1; i <= currentWeek; i++) {
    weekArray.push(i);
  }

  return (
    <div className="table-container">
      <button className="close-button" onClick={handleCardCollapse}> X </button>
      <h2>Onboarding: Customers Remaining</h2>
      <table className="table-container">
        <th className="table-header name-data">Name</th>
        {weekArray.map((week, index) => {
          return (
            <th id={index} className="table-header">
              Week {week}
            </th>
          );
        })}
        {employees.map((employee, index) => {
          return (
            <tr className="table-row">
              <td className="table-data table-data-name">{employee.email}</td>
              {weekArray.map((week, index) => {
                // console.log(week)
                return (
                  <td id={index} className="table-header">
                    {employee.numberPerWeek[week]}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <td className="table-data table-data-name">Total</td>

      </table>

      <TableInput session={sessionStorage.getItem('CurrentUser')} onSaveComplete={onSaveComplete}/>
    </div>
  );
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
