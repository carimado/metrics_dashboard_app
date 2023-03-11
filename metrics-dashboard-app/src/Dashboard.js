import './Dashboard.css'

import React from 'react'
import Sidebar from './Sidebar'
import MetricCard from './MetricCard';
import Header from './Header';
import MetricTable from './Table';

import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion'

export default function Dashboard() {
    const [numberOfOnboardings, setNumberOfOnboardings] = useState([]);
    const [totalOnboardingForWeek, setTotalOnboardingForWeek] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    let navigate = useNavigate();

    // NOTE: Route to check if token exists
    // - If the token exists go to Dashboard
    // - If does not exist go to /signin
    useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')
      if (!authToken) {
        navigate('/signin')
      }
      if (authToken) {
        navigate('/')
      }
      // eslint-disable-next-line
    }, [])
    
    // NOTE: Click handler to expand card
    const handleClick = () => {
      setIsOpen(!isOpen)
    }

    // NOTE: Click handler to close click INSIDE the card
    // - The state isOpen is passed as props
    const handleCloseClick = () => {
      setIsOpen(false)
    }
  
    // NOTE: Fetches ALL docs inside "Collection" in Firebase
    // - Filtered doc.data() is pushed into metricData and set in state
    // numberOfOnboardings state is passed to the card/table
    const getNumberOfOnboardings = async () => {
      const querySnapshot = await getDocs(collection(db, "numberOfOnboardings"))
      const metricData = []
      
      querySnapshot.forEach((doc) => {
        metricData.push(doc.data())
      })
      setNumberOfOnboardings(metricData)
    }

    // NOTE: Queries DB for LATEST entries to display totals for the week
    // - Iterates through the querySnapshot and extracts email and count 
    // - Searches the data array for an object with the same email. If exists skip
    // - If does not exist, creates an object with email and onboardingCount
    // - Updates the state

    const colRef = collection(db, "numberOfOnboardings")

    const getLatestOnboardingCounts = async () => {
      const q = query(colRef, orderBy("date", "desc"))
      const querySnapshot = await getDocs(q)
      const data = []

      querySnapshot.forEach((doc) => {
        const email = doc.data().email
        const onboardingCount = doc.data().onboardingRemaining
        const user = data.find((user) => {
          return user.email === email
        }
        )
        if (!user) {
          data.push({
            email: email,
            onboardingCount: onboardingCount
          })
        }
      })
      setTotalOnboardingForWeek(data)
    }

    useEffect(() => {
      getNumberOfOnboardings()
      getLatestOnboardingCounts()
      // eslint-disable-next-line 
    }, []);

    // NOTE: the state totalOnboardingForWeek is totalled and passed to MetricCard component
    const totalOnboardings = totalOnboardingForWeek.reduce((acc, item) => {
      return acc + item.onboardingCount
    }, 0)

    return (
        <div className="dashboard">
            <Sidebar className="sidebar"/>
            <div className="dashboard-container">
                <Header className="header"/>
                <div className="card-container">
                    <motion.div className='card' onClick={isOpen ? undefined : handleClick} whileHover={{ scale: 1.05 }}>
                      {/* Expanded */}
                      {isOpen ? (
                      <MetricTable 
                        numberOfOnboardings={numberOfOnboardings} 
                        isOpen={isOpen} handleCloseClick={handleCloseClick} 
                        title={"Onboarding: Customers Remaining"}
                        onSaveComplete={getNumberOfOnboardings}
                        />) // Collapsed
                            : (<MetricCard 
                            totalOnboardings={totalOnboardings} 
                            title={"Total Onboarding Remaining"} 
                            data-testid="metric-card"
                            onSaveComplete={getLatestOnboardingCounts}
                            /> )}
                    </motion.div>
                    <motion.div className='card' onClick={isOpen ? undefined : handleClick} whileHover={{ scale: 1.05 }}>
                      <MetricCard />
                    </motion.div>
                    <motion.div className='card' onClick={isOpen ? undefined : handleClick} whileHover={{ scale: 1.05 }}>
                      <MetricCard />
                    </motion.div>
                </div>
            </div>
        </div>
    )
  }
  
  // {/* <MetricCard  totalIntercomClosed={totalIntercomClosed}/> */}
  // {/* <MetricCard  />
  // <MetricCard  />
  // <MetricCard  />
  // <MetricCard  /> */}







    
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


    // Steps to implement total for each user:
    // 1. loop through the numberOfOnboardings object
    // 2. check each of the elements for the latest date for each user
    // 3. push it to an array to total/reduce it

    // 