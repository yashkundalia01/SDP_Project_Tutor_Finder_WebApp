import { Component } from "react";
import "./StudentWelcome.css";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <section className='background'>
          <div className='dark-overlay'>
            <div className='background-inner'>
              <h1 className='x-large'>Tutor Finder</h1>
              <p className='lead'>
                Create a profile, find your desired tutor and contact.
              </p>
              <div>
                <Link to='/student/register' className='btn btn-primary'>
                  Sign Up
                </Link>
                <Link to='/student/login' className='btn btn-light'>
                  Login
                </Link>
              </div>
              <br></br>
              <h5 className='my-1'>
                Are you tutor and looking for students?
                <Link to='/tutor/welcome'>
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
