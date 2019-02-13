import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

class CustomForm extends React.Component {
  
  submitHandler = (event, requestType, userID) => {
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    console.log(title, content);

    switch (requestType) {
      case "post":
        axios
          .post("http://127.0.0.1:8000/api/", {
            title: title,
            content: content
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        break;
      case "put":
        axios
          .put(`http://127.0.0.1:8000/api/${userID}/`, {
            title: title,
            content: content
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={event => {
            this.submitHandler(
              event,
              this.props.requestType,
              this.props.userID
            );
          }}
        >
          <Form.Item label="Title">
            <Input name="title" placeholder="Type your name here..." />
          </Form.Item>
          <Form.Item label="Content">
            <Input name="content" placeholder="Type your story here..." />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {this.props.buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
