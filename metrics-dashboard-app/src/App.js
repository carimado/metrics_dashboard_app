import './App.css';

import { useState } from 'react';
import { BrowserRouter as Router, Routes , Route, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  let navigate = useNavigate()
  const handleAction = (id) => {
    const authetication = getAuth()
    if (id === 1) {
      createUserWithEmailAndPassword(authetication, email, password)
      .then((response) => {
        navigate('/')
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
    }
  }

  return (
    <div className="App">
        <Routes>
          <Route path='/signup' element={ <SignUp 
            setEmail={setEmail} 
            setPassword={setPassword} 
            handleAction={() => handleAction(1)} /> } />
          <Route path='/signin' element={ <SignIn 
            setEmail={setEmail} 
            setPassword={setPassword}
            handleAction={() => handleAction(2)} /> } />
          <Route path='/' element={ <Dashboard /> }/>
        </Routes>
    </div>
  );
}

export default App;
