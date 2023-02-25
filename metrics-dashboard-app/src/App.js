import './App.css';

import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/' element={ <Dashboard /> }/>
          <Route path='/signin' element={ <SignIn /> } />
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
