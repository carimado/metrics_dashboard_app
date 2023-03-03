import './SignIn.css'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';

export default function SignIn( ) {
  // console.log(handleAction, setEmail, setPassword)
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  let navigate = useNavigate()
  const signInSubmit = (e) => {

    const email = e.target.email.value
    const password = e.target.password.value

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      navigate('/')
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      sessionStorage.setItem('CurrentUser', response.user.email)
      // console.log(sessionStorage.getItem('CurrentUser'))
      // console.log(response.user.email)
      
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
      <Container component="main" maxWidth="xs" className='form-container'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <h1>Login to CX Dashboard</h1>
          <Box component="form" onSubmit={signInSubmit} sx={{ mt:1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> 
          </Box>
        </Box>
      </Container>
  );
}