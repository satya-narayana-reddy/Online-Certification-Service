import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; 
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import LOGO from "../../assets/SASI.png"
import BG from "../../assets/BgImage.jpg"
import {LoadingButton} from '@mui/lab';
import { getAuth, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
     sendPasswordResetEmail } from "firebase/auth";
const theme = createTheme();


const Login = () => {
  const nav = useNavigate();
  const roles = ['client1@sasi.ac.in','client2@sasi.ac.in'];
  const [authError,setAuthError] = useState(false);
  const [SigninLoader,setSiginLoader] = useState(false);
  const [eMsg,setEMsg] = useState("");
  const [input,setInput] = useState({
    email:"",
    password:""
    })
    const auth = getAuth();
    function updatePassword(){
        sendPasswordResetEmail(auth,input.email)
        .then(()=>{
            alert('Password Reset Link has been sent to your email');
        })
        .catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error sending password reset email:", errorCode, errorMessage)
        })
    }
    
    function handleSubmit(){
      setSiginLoader(true);
        if(!input.email.endsWith('@sasi.ac.in')){
            alert('Use Only Sasi clg mail');
            setSiginLoader(false);
            return;
        }
        signInWithEmailAndPassword(auth,input.email,input.password)
        .then((res)=>{
            let flag = false;
            roles.map((mail)=>{
              if(mail===res.user.email){
                flag = true;
                  nav('/admin/dashboard');
              }
            })
            if(!flag){
              nav('/student/dashboard');
        }})
        .catch((err)=>{
          setSiginLoader(false);
            if(err.message.includes("network")){
              setAuthError(true);
              setEMsg("Network issue try again*");
            }
            else if(err.message.includes("invalid")){
              setAuthError(true);
              setEMsg("Invalid Email or Password*");
            }
        })
    }
    const  changeEmail = (event) => {
        let value = event.target.value;
        setInput({
            ...input,
            email:value
        })
    };
    const changePassword = (event) =>{
        let val = event.target.value;
        setInput({
            ...input,
            password:val
        })
    }


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
  item
  xs={false}
  sm={4}
  md={7}
  sx={{
    backgroundImage: `url(${BG})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[800],
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
  }}
/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} p={1} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           <img 
                  src={LOGO} 
                  alt="SITE"   
                  style={{ width: '100%', height: 'auto' }}  
                />
                <Typography component="h1" variant="h4">
                  Login in
                </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={changeEmail}
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
                onChange={changePassword}
              />
              {authError && <Typography variant='subtitle1' color='red'>{eMsg}</Typography>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                loading={SigninLoader}
                loadingIndicator='Sigining...'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link to={"/forgotpassword"} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Grid m={'1vw'}>
              <Typography component={'p'} variant='underlined'>Don't have an account?<Link to={'/signup'}>Create</Link></Typography>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
