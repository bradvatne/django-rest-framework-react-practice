import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserList from './containers/UserList.js';
import UserDetail from './containers/UserDetail.js'
import Login from './containers/Login';
import Signup from './containers/Signup';

class BaseRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={UserList} />
        <Route exact path="/users/:userID/" component={UserDetail} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
      </div>
    )
  }
}

export default BaseRouter;