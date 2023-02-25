import './Dashboard.css'

import React from 'react'
import Sidebar from './Sidebar'
import MetricCard from './MetricCard';
import Header from './Header';

import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function Dashboard() {

    const [numberOfOnboardings, setNumberOfOnboardings] = useState([]);
    const [numberOfIntercomClosed, setNumberOfIntercomClosed] = useState([]);
    
    // const numberOfOnboardingsCollectionRef = collection(db, "numberOfOnboardings")
    // const numberOfIntercomClosedRef = collection(db, "numberOfIntercomClosed")

  
    useEffect(() => {
      // const getNumberOfOnboardings = async () => {
      //   const data = await getDocs(numberOfOnboardingsCollectionRef);
      //   console.log(data)
      //   setNumberOfOnboardings(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      // }
      // getNumberOfOnboardings();

      const getNumberOfOnboardings = async () => {
        const querySnapshot = await getDocs(collection(db, "numberOfOnboardings"));
        const metricData = []
        
        querySnapshot.forEach((doc) => {
          
          metricData.push(doc.data())
        });
        setNumberOfOnboardings(metricData)
      }

      const getNumberOfIntercomClosed = async () => {
        const querySnapshot = await getDocs(collection(db, "numberOfIntercomClosed"))
        const metricDataForIntercomClosed = []

        querySnapshot.forEach((doc) => {
          metricDataForIntercomClosed.push(doc.data())
        })
        setNumberOfIntercomClosed(metricDataForIntercomClosed)
      }

      getNumberOfOnboardings()
      getNumberOfIntercomClosed()

    }, []);


    let totalOnboardings = numberOfOnboardings.reduce((acc, curr) => {
      return acc + curr.onboardingRemaining
    }, 0)

    let totalIntercomClosed = numberOfIntercomClosed.reduce((acc, curr) => {
      return acc + curr.numberClosed
    }, 0)

    return (
        <div className="dashboard">
            {/* <div style={{backgroundImage: `url(${banner})`}}></div> */} 
            <Sidebar className="sidebar"/>
            <div className="dashboard-container">
                <Header className="header"/>
                <div className="card-container">
                  {}
                    <MetricCard  totalOnboardings={totalOnboardings} />
                    <MetricCard  totalIntercomClosed={totalIntercomClosed}/>
                    <MetricCard  />
                    <MetricCard  />
                    <MetricCard  />
                    <MetricCard  />
                </div>
            </div>
        </div>
    )
}