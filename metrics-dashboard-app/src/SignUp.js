import './SignUp.css'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  
  let navigate = useNavigate()
  const signUpSubmit = (e) => {

    const email = e.target.email.value
    const password = e.target.password.value

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
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
      <h1>Create Account</h1>
      <Box component="form" onSubmit={signUpSubmit} sx={{ mt:1 }}>
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
          Create Account
        </Button>
        <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account?"}
                </Link>
              </Grid>
            </Grid>
      </Box>
    </Box>
  </Container>
  );
}