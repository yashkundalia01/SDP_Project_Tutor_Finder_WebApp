import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as action from "../../Store/actions";
import Spinner from "../UI/Spinner/Spinner";

class CourseDetails extends Component {
  state = {
    tutors: null,
    currentTutor: null,
    currentCourse: null,
  };

  async componentDidMount() {
    await this.props.getTutors();
    this.setState({ ...this.state, tutors: this.props.tutors });
    const queryParams = new URLSearchParams(window.location.search);
    const tid = queryParams.get("tid");
    const cid = queryParams.get("cid");
    const index = this.state.tutors.findIndex((i) => i._id == tid);
    const current_tutor = this.state.tutors[index];

    const courses = current_tutor.course;
    const course_index = courses.findIndex((c) => c._id == cid);
    const current_course = courses[course_index];
    this.setState({
      ...this.state,
      currentTutor: current_tutor,
      currentCourse: current_course,
    });
  }
  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }

    let details = this.state.currentCourse;
    if (details != null) {
      let text = details.demo_video_link;
      let result = text.indexOf("watch");
      const video_url =
        "https://www.youtube.com/embed/" + text.substring(result);
      details = (
        <div>
          <Link to='/student/dashboard' className='btn btn-light'>
            <i class='fas fa-arrow-left'></i> Back To Profiles
          </Link>
          <br></br>
          <br></br>
          <div className='profile-grid my-1'>
            <div className='profile-top bg-primary1 p-2'>
              <img
                className='round-img my-1'
                width='200px'
                height='210px'
                src={this.state.currentTutor.photo_url}
                alt=''
              />
              <h1 className='large'>{this.state.currentTutor.name}</h1>
              <p>
                <i class='fas fa-map-marker-alt'></i>
                {this.state.currentTutor.city},{" "}
                {this.state.currentTutor.country}
              </p>
            </div>
            <div className='profile-about bg-light p-2'>
              <h2 className='primary-text'>Contact Details</h2>
              <div className='skills'>
                <div className='p-1'>
                  <i className='fas fa-envelope'></i>{" "}
                  {this.state.currentTutor.email}
                </div>
                <div className='p-1'>
                  <i className='fas fa-phone'></i>{" "}
                  {this.state.currentTutor.phone_no}
                </div>
              </div>
              <div className='line'></div>
              <h2 className='primary-text'>Course Details</h2>
              <div className='skills'>
                <div className='p-1'>
                  <i className='fa fa-check'></i> {details.title}
                </div>
                <div className='p-1'>
                  <i className='fas fa-language'></i>Language:{" "}
                  {details.language}{" "}
                </div>
                <div className='p-1'>
                  <i className='fas fa-money-bill-wave-alt'></i>Fee:{" "}
                  {details.fee}
                </div>
              </div>
              <div className='line'></div>
              <h2 className='primary-text'>Demo Video</h2>
              <iframe
                src={video_url}
                allowFullScreen='allowFullScreen'
              ></iframe>{" "}
              <div className='line'></div>
              <h2 className='primary-text'>Course Description</h2>
              <p>{details.description}</p>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.loading || details == null) details = <Spinner />;

    return <div>{details}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
