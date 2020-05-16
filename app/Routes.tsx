import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import MatchHistoryPage from './containers/MatchHistoryPage';
import CounterPage from './containers/CounterPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.COUNTER} component={CounterPage} />
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.MATCHHISTORY} component={MatchHistoryPage} />
      </Switch>
    </App>
  );
}
