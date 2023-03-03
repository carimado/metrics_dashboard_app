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
      getLatestOnboardingCounts()

    }, []);

    const totalOnboardings = totalOnboardingForWeek.reduce((acc, item) => {
      return acc + item.onboardingCount
    }, 0)

    return (
        <div className="dashboard">
            <Sidebar className="sidebar"/>
            <div className="dashboard-container">
                <Header className="header"/>
                <div className="card-container">
                    <motion.div data-testid="test-click" className='card' onClick={isOpen ? undefined : handleClick} whileHover={{ scale: 1.05 }}>
                      {/* Rendering of card contents when expanded */}
                      {isOpen ? ( <MetricTable numberOfOnboardings={numberOfOnboardings} isOpen={isOpen} handleCloseClick={handleCloseClick}/>
                      
                      // Rendering of the card contents on the Dashboard
                      ) : ( <MetricCard totalOnboardings={totalOnboardings} title={"Total Onboarding Remaining"}></MetricCard> )}

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


    // Steps to implement total for each user:
    // 1. loop through the numberOfOnboardings object
    // 2. check each of the elements for the latest date for each user
    // 3. push it to an array to total/reduce it