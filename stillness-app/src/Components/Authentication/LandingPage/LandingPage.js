import React from 'react'
import './LandingPage.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



const LandingPage = () => {
  return (

    <div>

      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >

          <div className="description-container">
            <img alt="stillness logo" className="landing-img" src="../../../assets/images/stillness-img.svg"></img>

            <h1 className="description-title">Stillness is an  empowering gift to yourself.</h1>

            <Box>
              <p className="description-paragraph"> As fast-paced as life may be, it is necessary to step away and reclaim time for self-care. The Stillness app was created as a gentle reminder that cathartic release and mindful breathing together can be affirming in reclaiming your peace and clarity. Our application lets you track your mood while giving you space for reflective journaling each day. We send uplifting text reminders after each journaling session as a commemoration for self-care. Remove yourself from all external noise step into yourself with meditative breathing and relaxing music after a cathartic release. Take as much time as you need. This time and this space is just for you. Are you ready?
          </p>
            </Box>

          </div>
          {/* link will take user to Login/Signup Page */}
          {/* window is the api and location.href will link to to another page (url) */}
          <a href className="landing-link" onClick={() => window.location.href = "/Login"}> Login or Signup here</a>

          {/* <button className="landing-button" onClick={() => window.location.href = "/Login"}>I'm ready!</button> */}

        </Grid>
      </Container>
    </div>
  )
}


export default LandingPage;