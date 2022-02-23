import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";

var jwt = require("jwt-simple");
var secret = "yash";

class ForgetPassword extends Component {
  state = {
    email: null,
  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = async (e) => {
    e.preventDefault();

    var token = jwt.encode({ email: this.state.email }, secret);

    // decode
    var decoded = jwt.decode(token, secret);

    const link = "http://localhost:3000/tutor/setpassword?email_id=" + token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let body = JSON.stringify({
      service_id: "service_9j7kp3l",
      template_id: "template_x0d765w",
      user_id: "user_Nx7hWevDak5XL430qx9vx",
      template_params: {
        link: link,
        to: this.state.email,
      },
    });

    let body2 = JSON.stringify({
      email: this.state.email,
    });
    try {
      const res = await axios.post("/api/tutors/exists", body2, config);
      try {
        const res = await axios.post(
          "https://api.emailjs.com/api/v1.0/email/send",
          body,
          config
        );
        this.props.setAlert(
          "Set new password link sent to your email id.",
          "success"
        );
      } catch (err) {
        console.log(err);
        this.props.setAlert("Link not sent!!!", "danger");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => this.props.setAlert(err.msg, "danger"));
      }
    }
  };

  render() {
    return (
      <div>
        <h3 className='large primary-text'>Set new Password.</h3>
        <form
          className='form border border-3 p-3 rounded '
          onSubmit={(e) => this.onSubmitHandler(e)}
        >
          <div className='form-group'>
            <input
              type='email'
              placeholder='Enter your registered email id'
              onChange={(e) => this.onChangeHandler(e)}
              name='email'
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Send' />
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
export default connect(null, mapDispatchToProps)(ForgetPassword);
