import React from 'react';
import LoginScreen from './app/login/login';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './app/home/home';
import PrivateRoute from './app/common/privateroute';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/login" component={LoginScreen} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
