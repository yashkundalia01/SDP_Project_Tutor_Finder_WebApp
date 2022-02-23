import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
var jwt = require("jwt-simple");
var secret = "yash";

class SetPassword extends Component {
  state = {
    email: null,
    newPassword: null,
    confirmNewPassword: null,
  };

  onSubmitHandler = async (event) => {
    event.preventDefault();
    if (this.state.newPassword === this.state.confirmNewPassword) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const newPassword = this.state.newPassword;
      const body = JSON.stringify({
        email: this.state.email,
        password: this.state.newPassword,
      });
      try {
        const res = await axios.post(
          "/api/students/auth/setpassword",
          body,
          config
        );
        this.props.setAlert("Password changed successfully.", "success");
        this.props.history.replace("/student/login");
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((err) => this.props.setAlert(err.msg, "danger"));
        }
      }
    } else {
      this.props.setAlert("Passwords do not match", "danger");
    }
  };

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const email_id = queryParams.get("email_id");

    // decode
    var decoded = jwt.decode(email_id, secret).email;

    this.setState({
      ...this.state,
      email: decoded,
    });
  }

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  render() {
    return (
      <div>
        <h1 className='large primary-text'>Change Password</h1>
        <form className='form' onSubmit={this.onSubmitHandler}>
          <div className='form-group'>
            <input
              required
              type='text'
              placeholder='New password'
              name='newPassword'
              minLength='6'
              autoComplete='false'
              onChange={this.onChangeHandler}
            />
          </div>

          <div className='form-group'>
            <input
              required
              type='password'
              placeholder='Confirm New password'
              name='confirmNewPassword'
              minLength='6'
              onChange={this.onChangeHandler}
            />
          </div>

          <button className='btn btn-primary my-1' type='submit'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, type) => dispatch(action.setAlert(msg, type)),
  };
};
export default connect(null, mapDispatchToProps)(SetPassword);
