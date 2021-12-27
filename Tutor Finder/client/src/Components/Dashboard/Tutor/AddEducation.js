import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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
    const { school, degree, from, to, description, fieldofstudy } = this.state;
    const body = JSON.stringify({
      school,
      email: this.props.tutor.email,
      degree,
      from,
      to,
      description,
      fieldofstudy,
    });

    axios.post("/api/tutors/educations", body, config).then((res, err) => {
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
        <h1 className='large primary-text'>Add Your Education</h1>
        <small>* = required field</small>
        <form
          className='form'
          method='post'
          onSubmit={(event) => this.onSubmitHandler(event)}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School or College'
              name='school'
              value={this.state.school}
              onChange={(e) => this.onChangeHandler(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              onChange={(e) => this.onChangeHandler(e)}
              value={this.state.degree}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Field Of Study'
              name='fieldofstudy'
              onChange={(e) => this.onChangeHandler(e)}
              value={this.state.fieldofstudy}
              required
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              required
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
              placeholder='Program Description'
              value={this.state.description}
              onChange={(e) => this.onChangeHandler(e)}
              required
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary' />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
