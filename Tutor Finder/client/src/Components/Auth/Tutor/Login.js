import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../Store/actions";
import Spinner from "../../UI/Spinner/Spinner";

class TutorLogin extends Component {
  state = {
    email: "",
    password: "",
  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    try {
      this.props.login({ email, password });
    } catch (error) {}
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/tutor/dashboard' />;
    }

    let login_form = (
      <div>
        <h1 className='large primary-text'>Sign In</h1>
        <p className='lead'>
          <i class='fas fa-user'></i> Sign into Your Account
        </p>
        <form className='form' onSubmit={(e) => this.onSubmitHandler(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              onChange={(e) => this.onChangeHandler(e)}
              name='email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Password'
              name='password'
              minLength='6'
              required
            />
            <p className='my-1'>
              Forget password?{" "}
              <Link to='/tutor/forgetpassword'>Click here.</Link>
            </p>
          </div>
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/tutor/register'>Sign Up</Link>
        </p>
      </div>
    );

    if (this.props.loading) login_form = <Spinner />;

    return login_form;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, alertType) => dispatch(actions.setAlert(msg, alertType)),
    login: ({ name, email, password }) =>
      dispatch(actions.loginTutor({ email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorLogin);
