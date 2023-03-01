import './Dashboard.css'
import banner from './img/banner.jpg'

import React from 'react'
import Sidebar from './Sidebar'
import MetricCard from './MetricCard';
import Header from './Header';
import MetricTable from './Table';
import TableInput from './TableInput';

import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion'

export default function Dashboard() {
    const [numberOfOnboardings, setNumberOfOnboardings] = useState([]);

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
    


    console.log(numberOfOnboardings)
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

    
    // let lastSevenDays = new Date();
    // lastSevenDays.setDate(lastSevenDays.getDate() - 7);

    // let lastSevenDaysOnboardings = numberOfOnboardings.filter((item) => {
    //   return new Date(item.date) > lastSevenDays
    // })
    // console.log(lastSevenDaysOnboardings)

    // 1. get the onboarding object
    // 2. filter each document for the last entry from each user
    // 3. add up the onboarding remaining for each user
    // 4. display the total onboarding remaining for the last entry from each user

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen)
    }

    const handleCloseClick = () => {
      setIsOpen(false)
    }

    return (
        <div className="dashboard">
            <Sidebar className="sidebar"/>
            <div className="dashboard-container">
                <Header className="header"/>
                <div className="card-container">

                    <motion.div className='card' onClick={isOpen ? undefined : handleClick}>

                      {/* If the card is open display the table inside the white box with a button to close */}
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
              {/* <MetricTable numberOfOnboardings={numberOfOnboardings}/> */}
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

