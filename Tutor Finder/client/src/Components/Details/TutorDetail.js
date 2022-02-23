import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as action from "../../Store/actions";
import Moment from "react-moment";
import Spinner from "../UI/Spinner/Spinner";

class TutorDetail extends Component {
  state = {
    tutors: null,
    currentTutor: null,
  };

  async componentDidMount() {
    await this.props.getTutors();
    this.setState({ ...this.state, tutors: this.props.tutors });
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const index = this.state.tutors.findIndex((i) => i._id == id);
    this.setState({ ...this.state, currentTutor: this.state.tutors[index] });
  }
  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }
    let tutor = this.state.currentTutor;
    if (tutor != null) {
      tutor = (
        <div class='profile-grid my-1'>
          <div class='profile-top bg-primary1 p-2'>
            <img
              height={"200px"}
              height={"210px"}
              class='round-img my-1'
              src={tutor.photo_url}
              alt=''
            />
            <h1 class='large'>{tutor.name}</h1>
            <p>
              <i class='fas fa-map-marker-alt'></i> {tutor.city},{" "}
              {tutor.country}
            </p>
          </div>
          <div class='profile-about bg-light p-2'>
            <h2 class='primary-text'>Contact Details</h2>
            <div class='skills'>
              <div class='p-1'>
                <i class='fas fa-envelope'></i> {tutor.email}
              </div>
              <div class='p-1'>
                <i class='fas fa-phone'></i> {tutor.phone_no}
              </div>
            </div>

            <div class='line'></div>
            <h2 class='primary-text'>Courses</h2>
            <div class='skills'>
              {tutor.course.map((c) => {
                return (
                  <div class='p-1' key={c._id}>
                    <Link
                      to={
                        "/student/course-details?tid=" +
                        tutor._id +
                        "&cid=" +
                        c._id
                      }
                    >
                      <i class='fa fa-check'></i> {c.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {tutor.experience == null || tutor.experience.length == 0 ? (
            <p></p>
          ) : (
            <div class='profile-exp bg-white p-2'>
              <h2 class='primary-text'>Experience</h2>
              {tutor.experience.map((exp) => {
                return (
                  <div key={exp._id}>
                    <h3 class='text-dark'>{exp.company}</h3>
                    <p>
                      <i class='fas fa-calendar-day'></i>{" "}
                      <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{" "}
                      {exp.to == null || exp.to == undefined ? (
                        "Now"
                      ) : (
                        <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>
                        <i class='fas fa-users'></i> Position:{" "}
                      </strong>
                      {exp.title}
                    </p>
                    <p>
                      <strong>
                        <i class='fas fa-info-circle'></i> Description:{" "}
                      </strong>
                      {exp.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {tutor.education == null || tutor.education.length == 0 ? (
            <p></p>
          ) : (
            <div class='profile-edu bg-white p-2'>
              <h2 class='primary-text'>Education</h2>
              {tutor.education.map((edu) => {
                return (
                  <div key={edu._id}>
                    <h3>{edu.school}</h3>
                    <p>
                      <i class='fas fa-calendar-day'></i>{" "}
                      <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{" "}
                      {edu.to == null || edu.to == undefined ? (
                        "Now"
                      ) : (
                        <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>
                        {" "}
                        <i class='fas fa-user-graduate'></i> Degree:{" "}
                      </strong>
                      {edu.degree}
                    </p>
                    <p>
                      <strong>
                        <i class='fas fa-book'></i> Field Of Study:{" "}
                      </strong>
                      {edu.fieldofstudy}
                    </p>
                    <p>
                      <strong>
                        <i class='fas fa-info-circle'></i> Description:{" "}
                      </strong>
                      {edu.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    if (this.props.loading || tutor == null) tutor = <Spinner />;

    return (
      <div>
        <Link to='/student/dashboard' class='btn btn-light'>
          <i class='fas fa-arrow-left'></i> Back To Profiles
        </Link>
        <br></br>
        <br></br>
        {tutor}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTutors: () => dispatch(action.getTutors()),
  };
};

const mapStateToProps = (state) => ({
  tutors: state.tutors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetail);
