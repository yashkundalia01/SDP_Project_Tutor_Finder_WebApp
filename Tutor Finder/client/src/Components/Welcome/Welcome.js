import { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

class Welcome extends Component {
  render() {
    return (
      <div className='no-gutters'>
        <section className='background'>
          <div className='dark-overlay'>
            <div className='background-inner'>
              <div className='x-large'>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    strings: ["Tutor Finder"],
                  }}
                ></Typewriter>
              </div>
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
        <section className='m4-3'>
          <div className='row'>
            <div className='col-md-8 '>
              <h1 className='font-weight-bold text-uppercase mt-4   text-center'>
                About Us
              </h1>
              <p className='p-0 text-center'>
                This tutor finder web app is used by both student as well as
                tutor.
              </p>
              <div className='row m-4 p-3'>
                {" "}
                <div className='col-md-6'>
                  <div className='card'>
                    <div
                      className='bg-image hover-overlay ripple'
                      data-mdb-ripple-color='light'
                    ></div>
                    <div className='card-body'>
                      <h5 className='card-title'>Student</h5>
                      <p className='card-text'>
                        Student can find their desired tutor.And Get tutor's
                        contact information. And student can also make a post
                        for new subjects.
                      </p>
                      <Link to='/student/welcome' className='btn btn-primary'>
                        Student
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='card'>
                    <div
                      className='bg-image hover-overlay ripple'
                      data-mdb-ripple-color='light'
                    ></div>
                    <div className='card-body'>
                      <h5 className='card-title'>Tutor</h5>
                      <p className='card-text'>
                        Tutor can create full profile page. Tutor can add new
                        course information. Tutor provide their contact
                        information.
                      </p>
                      <Link to='/tutor/welcome' className='btn btn-light'>
                        Tutor
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <video height={"400px"} loop muted autoPlay>
                <source src='assets/images/learn.mp4' type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
        <footer className='bg bg-dark page-footer font-small stylish-color-primary pt-4 p-0 m-0 no-gutters'>
          <div className='text-center text-md-left'>
            <div className='row'>
              <hr className='clearfix w-100 d-md-none' />

              <div className='col-md-2 mx-auto'>
                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>
                  Company
                </h5>

                <ul className='list-unstyled'>
                  <li>
                    <a href='#!'>About</a>
                  </li>
                  <li>
                    <a href='#!'>Blog</a>
                  </li>
                  <li>
                    <a href='#!'>Press</a>
                  </li>
                  <li>
                    <a href='#!'>Services</a>
                  </li>
                </ul>
              </div>

              <hr className='clearfix w-100 d-md-none' />

              <div className='col-md-2 mx-auto'>
                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>
                  Terms & Policies
                </h5>

                <ul className='list-unstyled'>
                  <li>
                    <a href='#!'>Policies</a>
                  </li>
                  <li>
                    <a href='#!'>Terms of Use</a>
                  </li>
                  <li>
                    <a href='#!'>Privacy</a>
                  </li>
                </ul>
              </div>

              <hr className='clearfix w-100 d-md-none' />

              <div className='col-md-4 mx-auto'>
                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>
                  Have a Questions?
                </h5>

                <ul className='list-unstyled'>
                  <li>
                    <i className='fas fa-map-marker-alt'></i> 203 St. Fake
                    Mountain View, San Francisco, California, USA
                  </li>
                  <li>
                    <i className='fas fa-phone'></i> +2 39273929 210
                  </li>
                  <li>
                    <i className='fas fa-envelope'></i>{" "}
                    tutorfinder.feedback@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr></hr>

          <ul className='list-unstyled text-center py-2'>
            <li className='list-inline-item'>
              <h5 className='mb-1'>Register for free</h5>
            </li>
            <li className='list-inline-item'>
              <div>
                <Link to='/student/welcome' className='btn btn-primary'>
                  Student
                </Link>
                <Link to='/tutor/welcome' className='btn btn-light'>
                  Tutor
                </Link>
              </div>
            </li>
          </ul>

          <hr></hr>

          <ul className='list-unstyled list-inline text-center'>
            <li className='list-inline-item'>
              <a className='btn-floating btn-fb mx-1'>
                <i className='fab fa-facebook-f'> </i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a className='btn-floating btn-tw mx-1'>
                <i className='fab fa-twitter'> </i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a className='btn-floating btn-gplus mx-1'>
                <i className='fab fa-google-plus-g'> </i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a className='btn-floating btn-li mx-1'>
                <i className='fab fa-linkedin-in'> </i>
              </a>
            </li>
            <li className='list-inline-item'>
              <a className='btn-floating btn-dribbble mx-1'>
                <i className='fab fa-dribbble'> </i>
              </a>
            </li>
          </ul>
          <div className='footer-copyright text-center py-3'>
            © 2022 Copyright:
            <a href=''> TutorFinder.com</a>
          </div>
        </footer>
        <hr></hr>
      </div>
    );
  }
}

export default Welcome;
