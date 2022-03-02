import React, { Component } from "react";
import Layout from "./Layout/Tutor/TutorLayout";
import { Switch, Route, Redirect } from "react-router-dom";
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
import Feedbacks from "../Components/Dashboard/Tutor/Feedbacks";
import Rate from "../Components/Dashboard/Tutor/Rate";
import ReactEncrypt from "react-encrypt";
import ChangePassword from "../Components/Auth/Tutor/ChangePassword";
import ForgetPassword from "../Components/Auth/Tutor/ForgetPassword";
import SetPassword from "../Components/Auth/Tutor/SetPassword";
import CourseDetails from "../Components/Details/CourseDetails";

class Tutor extends Component {
  async componentDidMount() {
    await this.props.loadTutor();
  }

  render() {
    if (!localStorage.token) {
    } else {
      if (localStorage.role == "student") {
        return <Redirect to='/student/login' />;
      } else {
        localStorage.setItem("role", "tutor");
      }
    }
    const encryptKey = "ewfWE@#%$rfdsefgdsf";
    return (
      <div>
        <Layout>
          <Alert />
          <ReactEncrypt encryptKey={encryptKey}>
            <Switch>
              <Route exact path='/tutor/register' component={TutorRegister} />
              <Route exact path='/tutor/login' component={TutorLogin} />
              <Route exact path='/tutor/dashboard' component={TutorDashboard} />
              <Route
                exact
                path='/tutor/add-experience'
                component={AddExperience}
              />
              <Route
                exact
                path='/tutor/add-education'
                component={AddEducation}
              />
              <Route exact path='/tutor/add-course' component={AddCourse} />
              <Route path='/tutor/course-details' component={CourseDetails} />
              <Route exact path='/tutor/profile' component={TutorProfile} />
              <Route exact path='/tutor/post' component={PostList} />
              <Route
                exact
                path='/tutor/changepassword'
                component={ChangePassword}
              />
              <Route exact path='/tutor/feedbacks' component={Feedbacks} />
              <Route
                exact
                path='/tutor/forgetpassword'
                component={ForgetPassword}
              />
              <Route path='/tutor/setpassword' component={SetPassword} />
            </Switch>
          </ReactEncrypt>
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
