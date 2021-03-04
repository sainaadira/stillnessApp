import React, { useState } from 'react'
import "./Login.css"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';




// all of the styles from material ui
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
  loginButton: {
    marginTop: '15px;'
  },
  homeLink: {
    color: 'black',
  }

}));

const Login = () => {

  const classes = useStyles()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prevState => {
      if (name === "email") {
        return {
          email: value,
          password: prevState.password
        }
      } else {
        return {
          email: prevState.email,
          password: value
        }
      }
    })
  }

  const handleSubmit = (e) => {
    console.log(form)
    e.preventDefault()
    fetch('/login', {
      method: "Post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => window.location.href = '/moodJournal')
  }
  return (

    <div className="login-container">

      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>

          <form className={classes.form} action='/login' method="POST" >

            {/* textfields for login component */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  value={form.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  value={form.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />


              {/* login button */}
              <Button fullWidth className={classes.loginButton} variant="contained" color="default" onClick={handleSubmit} type="submit">
                Login
              </Button>

              {/* link that directs user to homepage */}
              <Grid item>
                <Link className={classes.homeLink} onClick={() => window.location.href = "/"} variant="body2">
                  {"Go Home"}
                </Link>
              </Grid>

            </Grid>
          </form>

        </div>

      </Container>
    </div>
  )
}

export default Login; 