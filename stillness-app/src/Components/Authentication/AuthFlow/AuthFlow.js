import React, { useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import './AuthFlow.css'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#581845'
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  }

}));


const AuthFlow = () => {

  const classes = useStyles()

  //  variable used to toggle between login and signup components
  const [view, setView] = useState('login')

  const toggleView = (view) => {
    setView(view)
  }
  return (
    <div className="auth-container">

      <Container maxWidth="sm" className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {/* login/signup button */}
        <ButtonGroup fullWidth aria-label="outlined button group">
          <Button variant={view === 'login' ? "contained" : 'outlined'} onClick={() => toggleView('login')} >Login</Button>
          <Button variant={view === 'signup' ? "contained" : 'outlined'} onClick={() => toggleView('signup')} >Signup</Button>
        </ButtonGroup>
      </Container>



      {/* renders component based on view variable */}
      {view === 'login' &&
        <Login />
      }
      {view === 'signup' &&
        <Signup />
      }

    </div>
  )
}

export default AuthFlow;