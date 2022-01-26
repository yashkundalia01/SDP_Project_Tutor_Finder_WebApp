import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import StudentLogin from "../Components/Auth/Student/Login";
import StudentRegister from "../Components/Auth/Student/Register";
import Layout from "./Layout/Student/StudentLayout";
import Dashboard from "../Components/Dashboard/StudentDashboard";
import Alert from "../Components/UI/Alert";
import TutorDetails from "../Components/Details/TutorDetail";
import { connect } from "react-redux";
import * as action from "../Store/actions";
import StudentProfile from "../Components/Profile/StudentProfile";
import CourseDetails from "../Components/Details/CourseDetails";
import post from "../Components/Post/StudentPost";
class Student extends Component {
  async componentDidMount() {
    await this.props.loadStudent();
  }

  render() {
    return (
      <div>
        <Layout>
          <Alert />
          <Switch>
            <Route exact path='/student/register' component={StudentRegister} />
            <Route exact path='/student/login' component={StudentLogin} />
            <Route exact path='/student/dashboard' component={Dashboard} />
            <Route path='/student/detail' component={TutorDetails} />
            <Route path='/student/course-details' component={CourseDetails} />
            <Route exact path='/student/profile' component={StudentProfile} />
            <Route exact path='/student/post' component={post} />

          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStudent: () => dispatch(action.loadStudent()),
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Student);
