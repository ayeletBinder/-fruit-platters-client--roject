import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addClient, addClient1, fetchclients, updateClientId } from './clientSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(4, 'firstname must be at least 4 characters')
    .max(20, 'firstname cannot exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'firstName can only contain letters, numbers, and underscores'
    )
    .required('firstname is required'),

    lastname: Yup.string()
    .min(4, 'lastname must be at least 4 characters')
    .max(20, 'lastname cannot exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'lastName can only contain letters, numbers, and underscores'
    )
    .required('lastName is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  street:Yup.string()
  .min(3, 'street must be at least 3 characters')
  .max(20, 'street cannot exceed 20 characters')
  .matches(
    /^[א-ת]+$/,
    'street can only contain letters'
  ),
    city:Yup.string()
  .min(3, 'city must be at least 3 characters')
  .max(20, 'city cannot exceed 20 characters')
  .matches(
    /^[א-ת]+$/,
    'city can only contain letters'
  ),
  
  password: Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .max(16, 'Password cannot exceed 16 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase char')
  .required('Password is required'),

  phone:Yup.string()
    .min(9, 'phone must be at least 9 characters')
    .max(10, 'phone cannot exceed 10 characters')
    .matches(/^[0-9]+$/, 'Invalid phone number')
    .required('phone is required'),
});

const defaultTheme = createTheme();

export default function SignUp() {
const  nav=useNavigate();

    let [isClientExist,setIsClientExist]=useState(false);
    const clients = useSelector((state) => state.clients.clients);
    const clientId = useSelector((state) => state.clients.clientId);
    const status = useSelector((state) => state.clients.status);
    let dispatch=useDispatch();
    // dispatch(updateClientId(client.id));

  const handleSubmit1 = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let adress1=data.get('city')+" "+data.get('street');
    let email1=data.get('email');
       let client = clients.find(x=>x.email===email1)      
    if(client===undefined){
        try{
            dispatch(addClient(data.get('firstName'),data.get('lastName'),email1,data.get('password'),data.get('phone'),adress1));
            nav('/')
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        setIsClientExist(true);
    }
  };

  const formik = useFormik({
    initialValues: { firstname: '',lastname:'',city:'', email: '', password: '' , phone: '' , street: '' },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <br/>
          {isClientExist &&<Alert severity="error">לקוח זה קיים במערכת</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit1} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus  
                  {...formik.getFieldProps('firstName')}
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div className='error'>{formik.errors.firstname}</div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...formik.getFieldProps('lastName')}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div className='error'>{formik.errors.lastname}</div>
                  )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className='error'>{formik.errors.email}</div>
                  )}
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phone"
                  autoComplete="phone"
                  {...formik.getFieldProps('phone')}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className='error'>{formik.errors.phone}</div>
                  )}</Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="city"
                  autoFocus
                  {...formik.getFieldProps('city')}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className='error'>{formik.errors.city}</div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="street"
                  name="street"
                  autoComplete="street"
                  {...formik.getFieldProps('street')}
                  />
                  {formik.touched.street && formik.errors.street && (
                    <div className='error'>{formik.errors.street}</div>
                  )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='error'>{formik.errors.password}</div>
                  )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link  href="SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
