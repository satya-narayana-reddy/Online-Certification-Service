import React from 'react';
import { Grid, Stack, Typography, TextField } from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Box} from '@mui/material'
import SASI from '../../../assets/SASI.png';
import {Paper} from '@mui/material';
import {getAuth,sendPasswordResetEmail} from 'firebase/auth';
import { useState } from 'react';
import {Alert} from'@mui/material';
import {getDocs,doc} from 'firebase/firestore';
import { database } from '../../../firebase';
const ForgotPassword = () => {
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [alert,setAlert] = useState(false);
    const [alertMsg,setAlertMsg] = useState('');
    const [alertState,setAlertState] = useState("");
    const [loading,setLoading] = useState(false);
    async function updatePassword() {
        setLoading(true);
        if (!email.endsWith('@sasi.ac.in')) {
            setAlertMsg("Enter Sasi Email Only");
            setAlertState('error');
            setAlert(true);
            setLoading(false);
            return;
        }
        try {
            const docRef = doc(database,'accounts',email);
            const docSnap = getDocs(docRef);
            if (docSnap.exists()){
              await sendPasswordResetEmail(auth, email);
                setAlertState("success");
                setAlertMsg('Set Password link is sent to your email');
                setAlert(true);
            }else{
                setAlertMsg("User not found. Please create an account.");
                setAlertState('error');
                setAlert(true);
            }
        } catch (error) {
            setAlertState("error");
            setAlertMsg(`Error sending password reset email: ${error.code} ${error.message}`);
            setAlert(true);
        }

        setLoading(false);
    }

    return (
        <Stack justifyContent='center' alignItems='center' spacing={2} sx={{ height: '100vh' }} p={2}>
               <Paper variant="outlined" sx={{ maxWidth: 600,p:2 }} style={{border:'none'}}> {/* Adjust maxWidth as needed */}
                 <img src={SASI} alt="SASI Logo" style={{ width: '100%', height: 'auto',border:'none' }} />
                </Paper>
              <Grid container direction='column' alignItems='center'>
            <Grid item>
              <Typography component='h1' variant='h4'>Reset Password</Typography>
            </Grid>
            <Grid item>
              <Stack spacing={4} sx={{ mt: 3 }}>
                <TextField variant='outlined' label='Email' fullWidth value={email} onChange={(e)=>{setEmail(e.target.value)}} size='large'/>
                <LoadingButton variant="contained" onClick={()=>{updatePassword(email)}} loading={loading} >Set password</LoadingButton>
              </Stack>
              
            </Grid>
            {
                  alert && alertState==='sucess' ? <Alert severity='success'>{alertMsg}</Alert>:
                  alert && <Alert severity='error'>{alertMsg}</Alert>
            }
          </Grid>
        </Stack>
      );
}

export default ForgotPassword
