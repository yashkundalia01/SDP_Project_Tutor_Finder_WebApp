import { Component } from "react";
import "./TutorWelcome.css";
import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";

class Welcome extends Component {
  render() {
    return (
      <div>
        <section className='background'>
          <div className='dark-overlay'>
            <div className='background-inner'>
              <h1 className='x-large'>Tutor Finder</h1>
              <p className='lead'>
                Create a profile, add course details and find students.
              </p>
              <div>
                <Link to='/tutor/register' className='btn btn-primary'>
                  Sign Up
                </Link>
                <Link to='/tutor/login' className='btn btn-light'>
                  Login
                </Link>
              </div>
              <br></br>
              <h5 className='my-1'>
                Are you student and looking for tutor?
                <Link to='/student/welcome'>
                  <p>Click here</p>
                </Link>
              </h5>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Welcome;
