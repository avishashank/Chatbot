import React from 'react';
import LoginScreen from './app/login/login';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './app/home/home';
import PrivateRoute from './app/common/privateroute';


function wrapperComponent(WrappedComponent:any, maxWidth?: string) {
  maxWidth = maxWidth? maxWidth: "786px";
  return class extends React.Component {
    componentWillReceiveProps(nextProps:any) {}
    render() {
      return <div style={{maxWidth:maxWidth ,margin:"auto", height:"100%", position:"relative"}}><WrappedComponent {...this.props} /></div>
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/login" component={wrapperComponent(LoginScreen)} />
          <PrivateRoute exact path="/" component={wrapperComponent(Home, '1366px')} />
        </Switch>
      </Router>
    );
  }
}

export default App;
