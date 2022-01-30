import { Fragment, Component } from "react";
import "./TutorNavigationItems.css";
import NavigationItem from "./NavigationItem/TutorNavigationItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../../../Store/actions";

class navigationItems extends Component {
  render() {
    const myStyle = {
      margin: "10px",
      display: "block",
      width: "100%",
      color: "white",
    };

    const authLinks = (
      <ul className='NavigationItems'>
        <NavigationItem link='/tutor/post'> Posts </NavigationItem>
        <NavigationItem link='/tutor/dashboard'> Dashboard </NavigationItem>
        <Link onClick={this.props.logout} to='/tutor/login' style={myStyle}>
          Logout <i class='fas fa-sign-out-alt'></i>
        </Link>
      </ul>
    );
    const guestLinks = (
      <ul className='NavigationItems'>
        <NavigationItem link='/tutor/register'> Register </NavigationItem>
        <NavigationItem link='/tutor/login'>Login</NavigationItem>
      </ul>
    );
    return (
      <Fragment>
        {!this.props.loading && (
          <Fragment>
            {this.props.isAuthenticated ? authLinks : guestLinks}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
