import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
import Moment from "react-moment";
import axios from "axios";

class TutorDashboard extends Component {
  state = {
    name: "",
    experience: null,
    education: null,
    courses: null,
    availability_status: "",
  };

  async deleteCourse(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    await axios.delete("/api/tutors/courses/" + id, config);
    this.props.setAlert("Deleted Successfully");
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

  async deleteExperience(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    await axios.delete("/api/tutors/experiences/" + id, config);
    this.props.setAlert("Deleted Successfully");
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

  async deleteEducation(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    await axios.delete("/api/tutors/educations/" + id, config);
    this.props.setAlert("Deleted Successfully");
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

  async componentDidMount() {
    await this.props.loadTutor();
    this.setState({
      ...this.state,
      name: this.props.tutor.name,
      experience: this.props.tutor.experience,
      education: this.props.tutor.education,
      courses: this.props.tutor.course,
      availability_status: this.props.tutor.availability_status,
    });
  }

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  changeAvailabilityStatus = () => {
    console.log("Availability Status: " + this.state.availability_status);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    const { availability_status } = this.state;
    const body = JSON.stringify({
      availability_status,
      email: this.props.tutor.email,
    });

    axios
      .post("/api/tutors/availability_status", body, config)
      .then((res, err) => {
        this.props.setAlert("Changed Successfully");
        setTimeout(() => {
          document.location.reload();
        }, 1000);
      });
  };

  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }
    let courses = null;
    if (this.state.courses != null) {
      courses = this.state.courses.map((item) => {
        return (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td className='hide-sm'>{item.fee}</td>
            <td className='hide-sm'>{item.language}</td>
            <td>
              <button
                className='btn btn-primary'
                onClick={this.deleteCourse.bind(this, item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    let exp = null;
    if (this.state.experience != null) {
      exp = this.state.experience.map((item) => {
        return (
          <tr key={item._id}>
            <td>{item.company}</td>
            <td className='hide-sm'>{item.title}</td>
            <td className='hide-sm'>
              <Moment format='DD/MM/YYYY'>{item.from}</Moment>
            </td>
            <td className='hide-sm'>
              {item.to == null || item.to == undefined ? (
                "Now"
              ) : (
                <Moment format='DD/MM/YYYY'>{item.to}</Moment>
              )}
            </td>
            <td>
              <button
                className='btn btn-primary'
                onClick={this.deleteExperience.bind(this, item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    let edu = null;
    if (this.state.education != null) {
      edu = this.state.education.map((item) => {
        return (
          <tr key={item._id}>
            <td>{item.school}</td>
            <td className='hide-sm'>{item.degree}</td>
            <td className='hide-sm'>
              <Moment format='DD/MM/YYYY'>{item.from}</Moment>
            </td>
            <td className='hide-sm'>
              {item.to == null || item.to == undefined ? (
                "Now"
              ) : (
                <Moment format='DD/MM/YYYY'>{item.to}</Moment>
              )}
            </td>
            <td>
              <button
                className='btn btn-primary'
                onClick={this.deleteEducation.bind(this, item._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <h1 className='large primary-text'>Dashboard</h1>
        <p className='lead'>Welcome {this.state.name}</p>
        <div className='dash-buttons'>
          <Link to={"/tutor/profile"} className='btn btn-primary'>
            Edit Profile
          </Link>
          <Link to={"/tutor/add-experience"} className='btn btn-primary'>
            Add Experience
          </Link>
          <Link to={"/tutor/add-education"} className='btn btn-primary'>
            Add Education
          </Link>
          <Link to={"/tutor/add-course"} className='btn btn-primary'>
            Add Course
          </Link>
        </div>
        <br></br>
        <br></br>
        <h2 className='my-2'>Availability Status</h2>
        Available:
        <select
          id='availability_status'
          name='availability_status'
          value={this.state.availability_status}
          onChange={(e) => this.onChangeHandler(e)}
        >
          <option value={"YES"}>YES</option>
          <option value={"NO"}>NO</option>
        </select>
        <br></br>
        <br></br>
        <button
          className='btn btn-primary'
          onClick={this.changeAvailabilityStatus}
        >
          Update
        </button>
        <br></br>
        <br></br>
        <h2 className='my-2'>Courses</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th className='hide-sm'>Fee</th>
              <th className='hide-sm'>Language</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{courses}</tbody>
        </table>
        <br></br>
        <br></br>
        <h2 className='my-2'>Experiences</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th className='hide-sm'>Title</th>
              <th className='hide-sm'>From</th>
              <th className='hide-sm'>To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{exp}</tbody>
        </table>
        <br></br>
        <br></br>
        <h2 className='my-2'>Educations</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School/College</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>From</th>
              <th className='hide-sm'>To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{edu}</tbody>
        </table>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadTutor: () => dispatch(action.loadTutor()),
    setAlert: (msg) => dispatch(action.setAlert(msg, "danger")),
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  tutor: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorDashboard);
