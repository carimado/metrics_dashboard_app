import './App.css';
// import Sidebar from './Sidebar'
// import MetricCard from './MetricCard';
// import Header from './Header';
import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';


function App() {

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
      {/* <Sidebar className="sidebar"/>
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
      </div> */}
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Router>



    </div>
  );
}

export default App;

// Layout - 
// 1. Is how im passing data correct? Parent -> Child
// 2. When I click on a card, i want to remove all cards and show one large card with data.
// 3. Dashboard Template?
