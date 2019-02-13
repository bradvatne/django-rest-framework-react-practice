import React, { Component } from "react";
import Users from "../components/User.js";
import axios from "axios";

export class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      this.setState({
        users: res.data
      });
      console.log(this.state.users)
    });
  }

  render() {
    return (
      <div>
        <Users data={this.state.users}/>
      </div>
    );
  }
}

export default UserList;
