import React from "react";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { Form, Input, Tooltip, Icon, Button } from "antd";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["nickname", "password", "confirm", "email"],
      (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.props.onSignup(
            values.nickname,
            values.password,
            values.confirm,
            values.email
          );
          this.props.history.push("/");
        }
      }
    );
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("nickname", {
            rules: [
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (username, password1, password2, email) => dispatch(actions.signup(username, password1, password2, email))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
