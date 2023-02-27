
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

export default function SignIn( { handleAction, setEmail, setPassword } ) {
  console.log(handleAction, setEmail, setPassword)
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  
  // const signInSubmit = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //   .then((auth) => {
  //     console.log(auth)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  return (
    <div>
      {/* <form onSubmit={signInSubmit}>
        <h1>Login to Dashboard</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form> */}
      <form>
        <h1>Login to Dashboard</h1>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit" onClick={handleAction}>Login</button>
      </form>
    </div>
  );
}