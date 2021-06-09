import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  // useParams
} from "react-router-dom"
import AuthFlow from '../Authentication/AuthFlow/AuthFlow';
import LandingPage from '../Authentication/LandingPage/LandingPage'
import MoodJournal from '../MoodJournal/MoodJournal';
import Breather from '../Breather/Breather'
import MoodJournalHistory from '../MoodJournalHistory/MoodJournalHistory'
import MoodChart from '../MoodChart/MoodChart;'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/app">
            <LandingPage />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/app/Login">
            <AuthFlow />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/app/MoodJournal">
            <MoodJournal />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/app/MoodJournalHistory">
            <MoodJournalHistory />
          </Route>
        </Switch>

        {/* added MoodChart Component to work on later*/}
        <Switch>
          <Route exact path="/app/MoodChart">
            <MoodChart />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/app/Breather">
            <Breather />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
