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
      // console.log(authToken)
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


    let totalOnboardings = numberOfOnboardings.reduce((acc, curr) => {
      return acc + curr.onboardingRemaining
    }, 0)

    // let totalIntercomClosed = numberOfIntercomClosed.reduce((acc, curr) => {
    //   return acc + curr.numberClosed
    // }, 0)



    return (
        <div className="dashboard">
            {/* <div style={{backgroundImage: `url(${banner})`}}></div> */} 
            <Sidebar className="sidebar"/>
            <div className="dashboard-container">
                <Header className="header"/>
                <div className="card-container">
                    <motion.div className='card' onClick={() => setIsOpen(!isOpen)}>
                      {isOpen ? <MetricCard style={{display: "none"}} session={sessionStorage.getItem('CurrentUser')} totalOnboardings={totalOnboardings} /> : <MetricCard  totalOnboardings={totalOnboardings} />}

                      {isOpen && <MetricTable numberOfOnboardings={numberOfOnboardings} /> }
                    </motion.div>
                    {/* <MetricCard  totalIntercomClosed={totalIntercomClosed}/> */}
                    {/* <MetricCard  />
                    <MetricCard  />
                    <MetricCard  />
                    <MetricCard  /> */}
                </div>
            </div>
            {/* {numberOfOnboardings ?? <MetricTable onboarding={numberOfOnboardings}/>} */}

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