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

  const [ICParticipatedAndClosed, setICParticipatedAndClosed] = useState([]);
  const ICParticipatedAndClosedCollectionRef = collection(db, "ICParticipatedAndClosed")
  console.log(ICParticipatedAndClosed)

  useEffect(() => {
    const getICParticipatedAndClosed = async () => {
      const data = await getDocs(ICParticipatedAndClosedCollectionRef);
      // console.log(data)
      setICParticipatedAndClosed(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getICParticipatedAndClosed();

  }, []);

  return (
    <div className="App">
      {/* <div style={{backgroundImage: `url(${banner})`}}></div> */}
      <Sidebar className="sidebar"/>
      <div className="dashboard-container">
        <Header className="header"/>
        <div className="card-container">
          <MetricCard  ICParticipatedAndClosed={ICParticipatedAndClosed}/>
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
