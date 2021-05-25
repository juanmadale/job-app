import React from 'react';
import {Route, Switch} from 'react-router-dom';
import JobList from './JobList';
import JobDetails from './JobDetails';
import NotFound from './NotFound';
import { JobsProvider } from './contexts/jobs.context';

function App() {
  return (
    <Switch>
      <JobsProvider>
        <Route exact path="/" render={routeProps => <JobList {...routeProps} />} />
        <Route exact path="/:jobId" render={routeProps => <JobDetails {...routeProps} />} />
      </JobsProvider>
      <Route render={() => <NotFound />} />

    </Switch>
  )  
}

export default App;
