import React, { Component } from "react";
import Users from "../components/User.js";
import axios from "axios";
import Form from "../components/Form.js";

export class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      this.setState({
        users: res.data
      });
      console.log(this.state.users);
    });
  }


  render() {
    return (
      <div>
        <Users data={this.state.users} />
        <br />
        <h2>Add your story</h2>
        <Form requestType="post" userID={null} buttonText="create" sendState={this.receiveState}/>
      </div>
    );
  }
}

export default UserList;
