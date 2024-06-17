import React from 'react';
import { Grid, Stack, Typography, TextField } from '@mui/material';
import {Button} from '@mui/material';
import {Box} from '@mui/material'
import SASI from '../../assets/SASI.png';
import {Paper} from '@mui/material';
import {getAuth,sendPasswordResetEmail,fetchSignInMethodsForEmail} from 'firebase/auth';
import { useState } from 'react';
import {LoadingButton} from '@mui/lab';
import {Alert} from'@mui/material';
import {collection} from 'firebase/firestore';
import { database } from '../../firebase';
const Signup = () => {
  const collectionRef = database.collection('accounts');
  const [email,setEmail] = useState("");
  const [alert,setAlert] = useState(false);
  const [loading,setLoading] = useState(false);
  const [alertSate,setAlertSate] = useState('');
  const [alertMessage,setAlertMessage] =  useState('');
  const auth = getAuth();
  const setPassword = ()=>{
    setLoading(true);
    collectionRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.email===email){
          setAlertMessage("You Alredy have an account!");
          setLoading(false);
          return 
        }
      });
    })
    .catch((error) => {
      setAlertMessage("Error in Signup");
      setLoading(false);
    });
    const docRef = collectionRef.doc();
    docRef.set({email:email});
  //   fetchSignInMethodsForEmail(auth, email)
  // .then((signInMethods) => {
  //   // If signInMethods array is empty, the email is not registered
  //   if (signInMethods.length === 0) {
  //     sendPasswordResetEmail(auth,email)
  //       .then(()=>{
  //         setAlert('sucess');
  //         setAlertMessage('Password Setting link set to ')
  //         setAlert(true);
  //       })
  //       .catch((err)=>{
  //           alert("failed");
  //       })
  //   } else {
  //     // Email is registered, signInMethods contains an array of sign-in methods (e.g., email/password, Google, etc.)
      
  //   }
  // })
  // .catch((error) => {
  //   // Handle error
  //   console.error("Error fetching sign-in methods:", error);
  // });
      
  
  }
  return (
    <Stack justifyContent='center' alignItems='center' spacing={2} sx={{ height: '100vh' }} p={2}>
           <Paper variant="outlined" sx={{ maxWidth: 600,p:2 }} style={{border:'none'}}> {/* Adjust maxWidth as needed */}
             <img src={SASI} alt="SASI Logo" style={{ width: '100%', height: 'auto',border:'none' }} />
            </Paper>
          <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography component='h1' variant='h4'>Sign Up</Typography>
        </Grid>
        <Grid item>
          <Stack spacing={4} sx={{ mt: 3 }}>
            <TextField variant='outlined' label='Email' fullWidth value={email} onChange={(e)=>{setEmail(e.target.value)}} size='large'/>
            <LoadingButton variant="contained" onClick={()=>{setPassword(email)}} >Set password</LoadingButton>
            {
              alert && <Alert severity="success">Set Password link is sent to your email</Alert>
            }
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Signup;
