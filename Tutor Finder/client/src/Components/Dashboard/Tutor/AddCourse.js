import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
import { Redirect } from "react-router-dom";

class AddCourse extends Component {
  state = {
    title: "",
    fee: "",
    language: "",
    demo_video_link: "",
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
    const { title, fee, language, demo_video_link, description } = this.state;
    const body = JSON.stringify({
      title,
      email: this.props.tutor.email,
      fee,
      language,
      demo_video_link,
      description,
    });

    axios.post("/api/tutors/courses", body, config).then((res, err) => {
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
        <h1 className='large primary-text'>Add Course</h1>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={(event) => this.onSubmitHandler(event)}
        >
          <div className='form-group'>
            <select
              id='title'
              name='title'
              onChange={(e) => this.onChangeHandler(e)}
              required
            >
              <option value='' disabled selected hidden>
                Select Course
              </option>
              <option value='C++'>C++</option>
              <option value='C#'>C#</option>
              <option value='Machine Learning'>Machine Lerning</option>
              <option value='Java'>Java</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Fee'
              name='fee'
              onChange={(e) => this.onChangeHandler(e)}
              required
            />
          </div>
          <div className='form-group'>
            <select
              id='language'
              name='language'
              onChange={(e) => this.onChangeHandler(e)}
              required
            >
              <option value='' disabled selected hidden>
                Select Language
              </option>
              <option value='English'>English</option>

              <option value='French'>French - français</option>

              <option value='German'>German - Deutsch</option>

              <option value='Gujarati'>Gujarati - ગુજરાતી</option>

              <option value='Hindi'>Hindi - हिन्दी</option>

              <option value='Russian'>Russian - русский</option>

              <option value='Spanish'>Spanish - español</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Demo Video Link  Ex: (https://www.youtube.com/watch?v=bsjfvjfjaf)'
              name='demo_video_link'
              onChange={(e) => this.onChangeHandler(e)}
              required
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Course Description'
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
