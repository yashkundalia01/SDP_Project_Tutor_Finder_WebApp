import { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <section className='background'>
          <div className='dark-overlay'>
            <div className='background-inner'>
              <h1 className='x-large'>
                <i class='fas fa-search'></i> Tutor Finder
              </h1>
              <p className='lead'>Welcome to the Tutor Finder App.</p>
              <div>
                <Link to='/student/welcome' className='btn btn-primary'>
                  Student
                </Link>
                <Link to='/tutor/welcome' className='btn btn-light'>
                  Tutor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Welcome;
