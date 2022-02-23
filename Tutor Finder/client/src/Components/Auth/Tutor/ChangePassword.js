import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../../Store/actions";

const ChangePassword = (props) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  if (!localStorage.token) {
    return <Redirect to='/' />;
  }

  const onChangeHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (formData.newPassword === formData.confirmNewPassword) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
      };
      const oldPassword = formData.oldPassword;
      const newPassword = formData.newPassword;
      const body = JSON.stringify({ oldPassword, newPassword });
      try {
        const res = await axios.post(
          "/api/tutors/auth/changepassword",
          body,
          config
        );
        props.setAlert("Password changed successfully.", "success");
        props.history.replace("/tutor/dashboard");
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((err) => props.setAlert(err.msg, "danger"));
        }
      }
    } else {
      props.setAlert("Passwords do not match", "danger");
    }
  };
  return (
    <div>
      <h1 className='large primary-text'>Change Password</h1>
      <form className='form' onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <input
            required
            type='password'
            placeholder='Old password'
            name='oldPassword'
            minLength='6'
            onChange={onChangeHandler}
          />
        </div>

        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='New password'
            name='newPassword'
            minLength='6'
            onChange={onChangeHandler}
          />
        </div>

        <div className='form-group'>
          <input
            required
            type='password'
            placeholder='Confirm New password'
            name='confirmNewPassword'
            minLength='6'
            onChange={onChangeHandler}
          />
        </div>

        <button className='btn btn-primary my-1' type='submit'>
          Submit
        </button>
        <Link to='/tutor/dashboard' className='btn btn-secondary'>
          Cancel
        </Link>
      </form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(action.setAlert(msg, alertType)),
  };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
