import React, { useState } from 'react'
import './Signup.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Signup = () => {
  // calling useStyles function to handle the property changes
  const classes = useStyles();

  // contactInfo variable to store the user's credentials and setContactInfo is the function that will handle the state change for the inputs.
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })
  // handleContactChange is responsible for accessing the value that the user types into the inputs
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactInfo(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  return (
    <div className="signup-container">

      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>

          <form className={classes.form} method="POST" action='/signup'>
            {/* in order for react to read my inputs they must be in self closing tags */}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleContactChange}
                  autoComplete="fname"
                  name="firstName"
                  value={contactInfo.firstName}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleContactChange}
                  autoComplete="lname"
                  name="lastName"
                  value={contactInfo.lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleContactChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={contactInfo.email}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleContactChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={contactInfo.password}
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleContactChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={contactInfo.phone}
                  autoComplete="phone"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowTexts" color="primary" />}
                  label="By signing up, I agree to receive uplifting SMS messages.  
                  * Message and data rates may apply depending on your mobile carrier."
                />
              </Grid>

              <Button variant="contained" fullWidth color="default" onClick={() => window.location.href = "/MoodJournal"}>
                Sign me up
        </Button>

            </Grid>

          </form>
        </div>

      </Container>
    </div >
  )
}

export default Signup;