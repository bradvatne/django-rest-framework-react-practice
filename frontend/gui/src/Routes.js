import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserList from './containers/UserList.js';
import UserDetail from './containers/UserDetail.js'

class BaseRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={UserList} />
        <Route exact path="/:userID" component={UserDetail} />
      </div>
    )
  }
}

export default BaseRouter;