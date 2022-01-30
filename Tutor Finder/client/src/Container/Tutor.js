import React, { Component } from "react";
import Layout from "./Layout/Tutor/TutorLayout";
import { Switch, Route } from "react-router-dom";
import TutorLogin from "../Components/Auth/Tutor/Login";
import TutorRegister from "../Components/Auth/Tutor/Register";
import Alert from "../Components/UI/Alert";
import TutorDashboard from "../Components/Dashboard/Tutor/TutorDashboard";
import AddExperience from "../Components/Dashboard/Tutor/AddExperience";
import AddEducation from "../Components/Dashboard/Tutor/AddEducation";
import TutorProfile from "../Components/Profile/TutorProfile";
import { connect } from "react-redux";
import * as action from "../Store/actions/index";
import AddCourse from "../Components/Dashboard/Tutor/AddCourse";
import PostList from "../Components/Post/PostList";

class Tutor extends Component {
  async componentDidMount() {
    await this.props.loadTutor();
  }

  render() {
    return (
      <div>
        <Layout>
          <Alert />
          <Switch>
            <Route exact path='/tutor/register' component={TutorRegister} />
            <Route exact path='/tutor/login' component={TutorLogin} />
            <Route exact path='/tutor/dashboard' component={TutorDashboard} />
            <Route
              exact
              path='/tutor/add-experience'
              component={AddExperience}
            />
            <Route exact path='/tutor/add-education' component={AddEducation} />
            <Route exact path='/tutor/add-course' component={AddCourse} />
            <Route exact path='/tutor/profile' component={TutorProfile} />
            <Route exact path='/tutor/post' component={PostList} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTutor: () => dispatch(action.loadTutor()),
  };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutor);
