import './App.css';
import Sidebar from './Sidebar'
import MetricCard from './MetricCard';
import Header from './Header';
import { useState, useEffect } from 'react';

import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';


function App() {
  // const [users, setUsers] = useState([]);
  // const usersCollectionRef = collection(db, "users")


  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     // console.log(data)
  //     setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
  //   }
  //   getUsers();

  // }, []);

  // const [ICParticipatedAndClosed, setICParticipatedAndClosed] = useState([]);
  // const ICParticipatedAndClosedCollectionRef = collection(db, "ICParticipatedAndClosed")
  // console.log(ICParticipatedAndClosed)

  // useEffect(() => {
  //   const getICParticipatedAndClosed = async () => {
  //     const data = await getDocs(ICParticipatedAndClosedCollectionRef);
  //     console.log(data)
  //     setICParticipatedAndClosed(data.docs.map(doc => ({...doc.data(), id: doc.id})))
  //   }
  //   getICParticipatedAndClosed();

  // }, []);

  const [numberOfOnboardings, setNumberOfOnboardings] = useState([]);
  const numberOfOnboardingsCollectionRef = collection(db, "numberOfOnboardings")
  // console.log(numberOfOnboardings[0].onboardingRemaining)

  useEffect(() => {
    const getNumberOfOnboardings = async () => {
      const data = await getDocs(numberOfOnboardingsCollectionRef);
      // console.log(data)
      setNumberOfOnboardings(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getNumberOfOnboardings();

  }, []);

  let totalOnboardings = numberOfOnboardings.reduce((acc, curr) => {
    return acc + curr.onboardingRemaining
  }, 0)
  // console.log(totalOnboardings)

  return (
    <div className="App">
      {/* <div style={{backgroundImage: `url(${banner})`}}></div> */}
      <Sidebar className="sidebar"/>
      <div className="dashboard-container">
        <Header className="header"/>
        <div className="card-container">
          <MetricCard  totalOnboardings={totalOnboardings} />
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
        </div>
      </div>
    </div>
  );
}

export default App;

// Questions: 
// Data - 
// 1. Are my collections/documents structured correctly?

// Layout - 
// 1. Is how im passing data correct? Parent -> Child
// 2. When I click on a card, i want to remove all cards and show one large card with data.