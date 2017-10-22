import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import Feature from './feature'

import SignIn from './auth/signin'
import SignOut from './auth/signout'
import SignUp from './auth/signup'
import Welcome from './welcome'

import AuthHOC from './Authenticate';

export default class App extends Component {
 
  render() {
    const { match } = this.props;

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={match.url} component= {Welcome}/>
          <Route path={match.url + "signin"} component={SignIn}/>
          <Route path={match.url + "feature"} component={AuthHOC(Feature)}/>
          <Route path={match.url + "signout"} component={AuthHOC(SignOut)}/>
          <Route path={match.url + "signup"} component={SignUp}/>
        </Switch>
      </div>
    );
  }
}
