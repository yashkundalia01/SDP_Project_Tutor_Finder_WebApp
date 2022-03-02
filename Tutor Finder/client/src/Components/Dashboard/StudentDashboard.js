import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import * as action from "../../Store/actions";

class StudentDashboard extends Component {
  state = {
    tutors: null,
    searchResult: null,
    search: "",
    course: "Select",
    sort: null,
    star: null,
  };

  async componentDidMount() {
    await this.props.getTutors();
    this.setState({
      tutors: this.props.tutors.map((t) => {
        return t;
      }),
      searchResult: this.props.tutors.map((t) => {
        return t;
      }),
    });
  }

  onChangeHandler(e) {
    const s = e.target.value;
    if (s == null || s == "")
      this.setState({
        ...this.state,
        searchResult: this.state.tutors,
        search: s,
      });
    else {
      const newSearch = this.state.tutors.filter((t) => {
        const courses = t.course;
        const course = courses.filter((c) => {
          const title = c.title.toUpperCase();
          return title.includes(s.toUpperCase());
        });
        return course != null && course != undefined && course.length != 0;
      });
      console.log(newSearch);
      this.setState({ ...this.state, searchResult: newSearch, search: s });
    }
  }

  arr2obj = (arr) => {
    // Create an empty object
    let obj = [];

    arr.forEach((v) => {
      v.forEach((o) => {
        obj.push(o);
      });
    });

    // Return the object
    return obj;
  };

  sortRatingA = () => {
    let objs = this.state.searchResult.map((t) => {
      return t;
    });
    console.log(objs);
    if (objs != null && objs != undefined) {
      objs.sort((a, b) =>
        a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
      );
      console.log(this.state.tutors);
      this.setState({ ...this.state, searchResult: objs, sort: "ltoh" });
    }
  };
  sortRatingD = () => {
    let objs = this.state.searchResult.map((t) => {
      return t;
    });
    if (objs != null && objs != undefined) {
      objs.sort((a, b) =>
        a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
      );
      this.setState({ ...this.state, searchResult: objs, sort: "htol" });
    }
  };

  sortNameA = () => {
    let objs = this.state.searchResult.map((t) => {
      return t;
    });
    if (objs != null && objs != undefined) {
      objs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      this.setState({ ...this.state, searchResult: objs, sort: "atoz" });
    }
  };
  sortNameD = () => {
    let objs = this.state.searchResult.map((t) => {
      return t;
    });
    console.log(objs);
    if (objs != null && objs != undefined) {
      objs.sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
      this.setState({ ...this.state, searchResult: objs, sort: "ztoa" });
    }
  };

  clearResult = () => {
    this.setState({
      ...this.state,
      search: "",
      searchResult: this.props.tutors,
      tutors: this.props.tutors,
      course: "Select",
      sort: null,
      star: null,
    });
    console.log(this.props.tutors);
  };

  sorting = () => {
    const s = this.state.sort;
    if (s == "atoz") this.sortNameA();
    else if (s == "ztoa") this.sortNameD();
    else if (s == "ltoh") this.sortRatingA();
    else if (s == "htol") this.sortRatingD();
  };

  filterRating1 = async () => {
    const newResult = this.state.tutors.filter((t) => {
      return t.rating >= 4.5;
    });
    await this.setState({ ...this.state, searchResult: newResult, star: 4.5 });
    await this.filterRating4clone();
  };

  filterRating2 = async () => {
    const newResult = this.state.tutors.filter((t) => {
      return t.rating >= 4;
    });
    await this.setState({ ...this.state, searchResult: newResult, star: 4 });
    await this.filterRating4clone();
  };

  filterRating3 = async () => {
    const newResult = this.state.tutors.filter((t) => {
      return t.rating >= 3;
    });
    await this.setState({ ...this.state, searchResult: newResult, star: 3 });
    await this.filterRating4clone();
  };

  filterRating4 = async (e) => {
    if (e.target.value == "Select") {
      const newResult = this.state.tutors;
      await this.setState({ ...this.state, searchResult: newResult });
      await this.sorting();
    } else {
      const newResult = this.state.tutors.filter((t) => {
        const course = t.course.filter((c) => {
          return c.title.toUpperCase().includes(e.target.value.toUpperCase());
        });
        return course != null && course != undefined && course.length != 0;
      });
      await this.setState({
        ...this.state,
        searchResult: newResult,
        star: null,
        course: e.target.value,
      });
      await this.sorting();
    }
  };

  filterRating4clone = async () => {
    if (this.state.course == "Select") {
      const newResult = this.state.searchResult;
      await this.setState({ ...this.state, searchResult: newResult });
      await this.sorting();
    } else {
      const newResult = this.state.searchResult.filter((t) => {
        const course = t.course.filter((c) => {
          return c.title
            .toUpperCase()
            .includes(this.state.course.toUpperCase());
        });
        return course != null && course != undefined && course.length != 0;
      });
      await this.setState({
        ...this.state,
        searchResult: newResult,
      });
      await this.sorting();
    }
  };

  onCourseChangeHandler = (e) => {
    this.filterRating4(e);
  };

  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }

    let profiles = null;
    if (this.state.searchResult != null) {
      profiles = this.state.searchResult.map((t) => {
        return t.availability_status == "NO" ? null : (
          <div key={t._id} className='profile bg-light'>
            <img
              height={"200px"}
              height={"210px"}
              className='round-img'
              src={t.photo_url}
              alt=''
            />
            <div>
              <h2> {t.name}</h2>
              <p>
                <i class='fas fa-map-marker-alt danger-text'></i> {t.city},{" "}
                {t.country}
              </p>
              <Link
                to={"/student/detail?id=" + t._id}
                className='btn btn-primary'
              >
                <i class='fas fa-eye'></i> View Profile
              </Link>
              <br></br>
              <br></br>
              <div>
                {t.rating + "   "}
                <Rating
                  initialValue={t.rating}
                  readonly
                  size={20} /* Available Props */
                />
                ( {t.noOfRating} )
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
        <p ClassName='lead'>
          <i class='fas fa-search'></i> Browse and contact to your desired
          tutors
        </p>
        <div className='form'>
          <div className='form-group'>
            <input
              type={"text"}
              value={this.state.search}
              placeholder=' Search by course'
              onChange={(e) => this.onChangeHandler(e)}
            />
          </div>
        </div>
        <p>
          <button
            className='btn btn-dark'
            data-bs-toggle='collapse'
            href='#collapseExample'
            role='button'
            aria-expanded='false'
            aria-controls='collapseExample'
          >
            Sort
          </button>
          <button
            className='btn btn-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseExample2'
            aria-expanded='false'
            aria-controls='collapseExample2'
          >
            Filter
          </button>
          <button
            className='btn btn-danger'
            type='button'
            onClick={this.clearResult}
          >
            Clear Result
          </button>
        </p>

        <div className='collapse' id='collapseExample'>
          <div className='rounded border border-3 p-3'>
            <h3>
              <b>Sort By:</b>
            </h3>
            <button
              className={
                this.state.sort == "ltoh" ? "btn btn-primary" : "btn btn-light"
              }
              onClick={this.sortRatingA}
            >
              Rating: Low to High
            </button>
            <button
              className={
                this.state.sort == "htol" ? "btn btn-primary" : "btn btn-light"
              }
              onClick={this.sortRatingD}
            >
              Rating: High to Low
            </button>
            <button
              className={
                this.state.sort == "atoz" ? "btn btn-primary" : "btn btn-light"
              }
              onClick={this.sortNameA}
            >
              Name: A to Z
            </button>
            <button
              className={
                this.state.sort == "ztoa" ? "btn btn-primary" : "btn btn-light"
              }
              onClick={this.sortNameD}
            >
              Name: Z to A
            </button>
          </div>
        </div>
        <div className='collapse' id='collapseExample2'>
          <br></br>
          <div className='rounded border border-3 p-3'>
            <h3>
              <b>Course</b>
              <div className='form'>
                <div className='form-group'>
                  <select
                    onChange={(e) => this.onCourseChangeHandler(e)}
                    required
                    value={this.state.course}
                  >
                    <option disabled selected hidden value='Select'>
                      Select Course
                    </option>
                    <option value='C++'>C++</option>
                    <option value='C#'>C#</option>
                    <option value='Machine Learning'>Machine Lerning</option>
                    <option value='Java'>Java</option>
                  </select>
                </div>
              </div>
            </h3>
            <hr></hr>
            <p>
              <h3>
                <b>Rating</b>
              </h3>
              <button
                className={
                  this.state.star == 4.5 ? "btn btn-primary" : "btn btn-light"
                }
                onClick={this.filterRating1}
              >
                4.5 + <i className='fas fa-star'></i>
              </button>
              <button
                className={
                  this.state.star == 4 ? "btn btn-primary" : "btn btn-light"
                }
                onClick={this.filterRating2}
              >
                4 + <i className='fas fa-star'></i>
              </button>
              <button
                className={
                  this.state.star == 3 ? "btn btn-primary" : "btn btn-light"
                }
                onClick={this.filterRating3}
              >
                3 + <i className='fas fa-star'></i>
              </button>
            </p>
          </div>
        </div>
        <br></br>
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
