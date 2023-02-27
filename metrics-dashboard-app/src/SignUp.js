import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  let navigate = useNavigate()
  const signUpSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((auth) => {
      navigate('/signin')
      console.log(auth)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <form onSubmit={signUpSubmit}>
        <h1>Create an account</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign up</button>
      </form>
      {/* <form>
        <h1>Create an account</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit" onClick={handleAction}>Sign up</button>
      </form> */}
    </div>
  );
}