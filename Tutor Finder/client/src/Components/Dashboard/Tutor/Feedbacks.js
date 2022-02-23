import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
import { Rating } from "react-simple-star-rating";
import Moment from "react-moment";
import { Redirect } from "react-router-dom";
import axios from "axios";

var jwt = require("jwt-simple");
var secret = "yash";

class Feedbacks extends Component {
  state = {
    name: null,
    id: null,
    allRatings: null,
    email: null,
    rating: null,
    noOfRating: null,
  };

  async componentDidMount() {
    await this.props.loadTutor();
    this.setState({
      ...this.state,
      name: this.props.tutor.name,
      id: this.props.tutor._id,
      allRatings: this.props.tutor.allRatings,
      rating: this.props.tutor.rating,
      noOfRating: this.props.tutor.noOfRating,
    });
  }

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = async (e) => {
    e.preventDefault();

    var token = jwt.encode({ email: this.state.email }, secret);

    // decode
    var decoded = jwt.decode(token, secret);

    const link =
      "http://localhost:3000/rate?tid=" + this.state.id + "&email_id=" + token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let body = JSON.stringify({
      service_id: "service_9j7kp3l",
      template_id: "template_o9i0bto",
      user_id: "user_Nx7hWevDak5XL430qx9vx",
      template_params: {
        link: link,
        to: this.state.email,
      },
    });

    let body2 = JSON.stringify({
      email: this.state.email,
    });
    try {
      const res = await axios.post("/api/students/exists", body2, config);
      try {
        const res = await axios.post(
          "https://api.emailjs.com/api/v1.0/email/send",
          body,
          config
        );
        this.props.setAlert("Feedback link sent.", "success");
      } catch (err) {
        console.log(err);
        this.props.setAlert("Feedback link not sent!!!", "danger");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => this.props.setAlert(err.msg, "danger"));
      }
    }
  };

  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }

    let feedbacks = null;
    if (this.state.allRatings != null) {
      feedbacks = this.state.allRatings.map((r) => {
        return (
          <div key={r._id} className='posts mb-3'>
            <div className='post bg-white p-1 my-1'>
              <div>
                <h4>{r.name}</h4>
              </div>
              <div>
                <p className='my-1'>{r.feedback}</p>
                <p className='post-date'>
                  Posted on <Moment format='DD/MM/YYYY'>{r.date}</Moment>
                </p>
                {r.rating}{" "}
                <Rating allowHover readonly initialValue={r.rating} size={25} />
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <h3 className='large primary-text'>Send Feedback form</h3>
        <form
          className='form border border-3 p-3 rounded '
          onSubmit={(e) => this.onSubmitHandler(e)}
        >
          <div className='form-group'>
            <input
              type='email'
              placeholder="Enter student's email id"
              onChange={(e) => this.onChangeHandler(e)}
              name='email'
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Send' />
        </form>
        <br></br>
        <br></br>
        <div className='row'>
          <div className='col-md-8'>
            <h4 className='large primary-text'>Feedbacks</h4>
          </div>
          <div className='col-md-4 text-centre'>
            <h6 className='p-2 border border-4 rounded'>
              Overall rating: {this.state.rating + " "}{" "}
              <Rating
                allowHover
                readonly
                initialValue={this.state.rating}
                size={25}
              />
              ({this.state.noOfRating}){" "}
            </h6>
          </div>
        </div>
        {feedbacks}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTutor: () => dispatch(action.loadTutor()),
    setAlert: (msg, type) => dispatch(action.setAlert(msg, type)),
  };
};

const mapStateToProps = (state) => ({
  tutor: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacks);
