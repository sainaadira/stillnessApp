import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useParams
} from "react-router-dom"
import AuthFlow from '../Authentication/AuthFlow/AuthFlow';
import MoodJournal from '../MoodJournal/MoodJournal';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <MoodJournal />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
