import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../Store/actions";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import Moment from "react-moment";

class StudentPosts extends Component {
  state = {
    courses: undefined,
  };

  async componentDidMount() {
    await this.props.loadStudent();
    this.setState({
      ...this.state,
      courses: this.props.student.post,
    });
  }

  async deletePost(id) {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };

    await axios.delete("/api/students/post/" + id, config);
    this.props.setAlert("Deleted Successfully");
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

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
            <td className='hide-sm'>{item.language}</td>
            <td className='hide-sm'>
              <Moment format='DD/MM/YYYY'>{item.date}</Moment>
            </td>
            <td>
              <button
                className='btn btn-primary'
                onClick={this.deletePost.bind(this, item._id)}
              >
                <i class='fas fa-trash-alt'></i> Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    if (this.props.loading || courses == undefined) courses = <Spinner />;

    return (
      <div>
        <h1 className='large primary-text'>My Post</h1>
        <div className='dash-buttons'>
          <Link to={"/student/addpost"} className='btn btn-primary'>
            <i class='fas fa-plus'></i> Add Post
          </Link>
          <br></br>
          <br></br>
          <table className='table'>
            <thead>
              <tr>
                <th>
                  <i class='fas fa-circle'></i> Title
                </th>
                <th className='hide-sm'>
                  <i class='fas fa-language'></i> Language
                </th>
                <th className='hide-sm'>
                  <i class='fas fa-calendar-day'></i> Date
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>{courses}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadStudent: () => dispatch(action.loadStudent()),
    setAlert: (msg) => dispatch(action.setAlert(msg, "danger")),
  };
};

const mapStateToProps = (state) => ({
  student: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentPosts);
