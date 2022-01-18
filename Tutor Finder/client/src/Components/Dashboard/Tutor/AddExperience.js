import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
import { Redirect } from "react-router-dom";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    from: "",
    to: "",
    description: "",
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    const { title, company, from, to, description } = this.state;
    const body = JSON.stringify({
      title,
      email: this.props.tutor.email,
      company,
      from,
      to,
      description,
    });

    axios.post("/api/tutors/experiences", body, config).then((res, err) => {
      // this.props.history.replace("/tutors/dashboard");
      this.props.setAlert("Added Successfully");
    });
  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h1 className='large primary-text'>Add An Experience</h1>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={(event) => this.onSubmitHandler(event)}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              onChange={(e) => this.onChangeHandler(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              onChange={(e) => this.onChangeHandler(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              onChange={(e) => this.onChangeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              onChange={(e) => this.onChangeHandler(e)}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Job Description'
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg) => dispatch(action.setAlert(msg, "success")),
  };
};

const mapStateToProps = (state) => ({
  tutor: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
