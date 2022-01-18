import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "../../Store/actions";

class StudentDashboard extends Component {
  state = {
    tutors: null,
  };

  async componentDidMount() {
    await this.props.getTutors();
    this.setState({ tutors: this.props.tutors });
  }

  render() {
    let profiles = null;
    if (this.state.tutors != null) {
      profiles = this.state.tutors.map((t) => {
        return (
          <div key={t._id} className='profile bg-light'>
            <img
              height={"200px"}
              height={"210px"}
              className='round-img'
              src={t.photo_url}
              alt=''
            />
            <div>
              <h2>{t.name}</h2>
              <p>
                {t.city}, {t.country}
              </p>
              <Link
                to={"/student/detail?id=" + t._id}
                className='btn btn-primary'
              >
                View Profile
              </Link>
              <br></br>
              <br></br>
              <div>
                Availability Status:{" "}
                {t.availability_status == "YES" ? "Available" : "Not Available"}
              </div>
            </div>

            <ul>
              {t.course.map((c) => {
                return (
                  <li className='primary-text' key={c._id}>
                    <Link
                      to={
                        "/student/course-details?tid=" + t._id + "&cid=" + c._id
                      }
                    >
                      <i className='fas fa-check'></i> {c.title}{" "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      });
    }
    return (
      <div>
        <h1 ClassName='large primary-text'>Tutors</h1>
        <p ClassName='lead'>
          <i class='fas fa-search'></i> Browse and contact to your desired
          tutors
        </p>
        <div ClassName='profiles'>{profiles}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTutors: () => dispatch(action.getTutors()),
  };
};

const mapStateToProps = (state) => ({
  tutors: state.tutors,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
