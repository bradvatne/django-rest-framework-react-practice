import React, { Component } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import Form from "../components/Form.js";

export class UserDetail extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    axios.get(`http://127.0.0.1:8000/api/${userID}/`).then(res => {
      this.setState({
        user: res.data
      });
      console.log(this.state.user);
    });
  }

  handleDelete = (event) => {
    const userID = this.props.match.params.userID;
    axios.delete(`http://127.0.0.1:8000/api/${userID}/`);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <Card title={this.state.user.title}>
          <p>{this.state.user.content}</p>
        </Card>
        <Form
          requestType="put"
          userID={this.props.match.params.userID}
          buttonText="Update"
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

export default UserDetail;
