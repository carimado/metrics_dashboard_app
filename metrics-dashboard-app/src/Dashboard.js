import './Dashboard.css'

import React from 'react'
import Sidebar from './Sidebar'
import MetricCard from './MetricCard';
import Header from './Header';
import MetricTable from './Table';

import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion'

export default function Dashboard() {
    const [numberOfOnboardings, setNumberOfOnboardings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    let navigate = useNavigate()
    useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')
      if (!authToken) {
        navigate('/signin')
      }
      if (authToken) {
        navigate('/')
      }
    }, [])
    
    const handleClick = () => {
      setIsOpen(!isOpen)
    }

    const handleCloseClick = () => {
      setIsOpen(false)
    }

    // console.log(numberOfOnboardings)
    // const [numberOfIntercomClosed, setNumberOfIntercomClosed] = useState([]);

    // console.log(numberOfIntercomClosed, numberOfOnboardings)
  
    useEffect(() => {

      // const getNumberOfOnboardings = async () => {
      //   const querySnapshot = await getDocs(collection(db, "numberOfOnboardings"));
      //   console.log(querySnapshot)
      //   const metricData = []
        
      //   querySnapshot.forEach((doc) => {
          
      //     metricData.push(doc.data())
      //   });
      //   setNumberOfOnboardings(metricData)
      // }

      // console.log(getNumberOfOnboardings)

      const getNumberOfOnboardings = async () => {
        const querySnapshot = await getDocs(collection(db, "numberOfOnboardings"))
        const metricData = []

        querySnapshot.forEach((doc) => {
          metricData.push(doc.data())
        })
        setNumberOfOnboardings(metricData)
      }
      
      getNumberOfOnboardings()


      // const getNumberOfIntercomClosed = async () => {
      //   const querySnapshot = await getDocs(collection(db, "numberOfIntercomClosed"))
      //   const metricDataForIntercomClosed = []

      //   querySnapshot.forEach((doc) => {
      //     metricDataForIntercomClosed.push(doc.data())
      //   })
      //   setNumberOfIntercomClosed(metricDataForIntercomClosed)
      // }

      // getNumberOfOnboardings()
      // getNumberOfIntercomClosed()

    }, []);


    const totalOnboardings = numberOfOnboardings.reduce((acc, curr) => {
      return acc + curr.onboardingRemaining
    }, 0)


    // Steps to implement total for each user:
    // 1. loop through the numberOfOnboardings object
    // 2. check each of the elements for the latest date for each user
    // 3. push it to an array to total/reduce it






    const totalForEachUser = numberOfOnboardings.forEach((user) => {
      // I need to insert validation to only return each unique users entry against the date
      console.log(user.date)

      // const date = user.date.toDate()
      // const email = user.email

      // const today = new Date()

      // const difference = today - date


    })

    console.log(totalForEachUser)
    

    return (
        <div className="dashboard">
            <Sidebar className="sidebar"/>
            <div className="dashboard-container">
                <Header className="header"/>
                <div className="card-container">

                    <motion.div data-testid="test-click" className='card' onClick={isOpen ? undefined : handleClick} whileHover={{ scale: 1.05 }}>

                      {isOpen ? ( <MetricCard session={sessionStorage.getItem('CurrentUser')} totalOnboardings={totalOnboardings}>
                      </MetricCard>
                      
                      ) : ( <MetricCard totalOnboardings={totalOnboardings}></MetricCard> )}

                      {isOpen && (<MetricTable numberOfOnboardings={numberOfOnboardings} isOpen={isOpen} handleCloseClick={handleCloseClick}/>)}

                    </motion.div>

                    {/* <MetricCard  totalIntercomClosed={totalIntercomClosed}/> */}
                    {/* <MetricCard  />
                    <MetricCard  />
                    <MetricCard  />
                    <MetricCard  /> */}
                </div>
            </div>
        </div>
    )
}




    
// const numberOfOnboardingsCollectionRef = collection(db, "numberOfOnboardings")
// const numberOfIntercomClosedRef = collection(db, "numberOfIntercomClosed")

  // const getNumberOfOnboardings = async () => {
  //   const data = await getDocs(numberOfOnboardingsCollectionRef);
  //   console.log(data)
  //   setNumberOfOnboardings(data.docs.map(doc => ({...doc.data(), id: doc.id})))
  // }
  // getNumberOfOnboardings();


      // let lastSevenDays = new Date();
    // lastSevenDays.setDate(lastSevenDays.getDate() - 7);

    // let lastSevenDaysOnboardings = numberOfOnboardings.filter((item) => {
    //   return new Date(item.date) > lastSevenDays
    // })
    // console.log(lastSevenDaysOnboardings)

    // 1. get the onboarding object
    // 2. filter for each user and the last entry timestamp
    // 3. put the entry in an array

    // const totalOnboardingRemainingForEachUser = []

    // numberOfOnboardings.forEach((item) => {
    //   console.log(item)
    //   const user = totalOnboardingRemainingForEachUser.find((user) => user.email === item.email)
    //   // get only the last entry for each user??
    //   if (!user) {
    //     totalOnboardingRemainingForEachUser.push({
    //       email: item.email,
    //       onboardingRemaining: item.onboardingRemaining,
    //       date: {
    //         seconds: item.date.seconds,
    //         nanoseconds: item.date.nanoseconds
    //       }
    //     })
    //   } else {
    //     user.onboardingRemaining = item.onboardingRemaining
    //   }
    // })

    // console.log(totalOnboardingRemainingForEachUser)

    // check the date and for each user get the latest entry

