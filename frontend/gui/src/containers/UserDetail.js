import React, { Component } from "react";
import Users from "../components/User.js";
import axios from "axios";
import { Card } from 'antd';

export class UserDetail extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const userID = this.props.match.params.userID
    axios.get(`http://127.0.0.1:8000/api/${userID}`).then(res => {
      this.setState({
        user: res.data
      });
      console.log(this.state.user)
    });
  }

  render() {
    return (
      <div>
        <Card title={this.state.user.title}>
            <p>{this.state.user.content}</p>
        </Card>
      </div>
    );
  }
}

export default UserDetail;
