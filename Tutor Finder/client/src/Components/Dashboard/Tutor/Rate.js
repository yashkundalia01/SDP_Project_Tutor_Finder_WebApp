import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/actions";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Alert from "../../UI/Alert";

var jwt = require("jwt-simple");
var secret = "yash";

class Rate extends Component {
  state = {
    tid: null,
    email_id: null,
    name: null,
    feedback: null,
    rating: 0,
  };

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const tid = queryParams.get("tid");
    const email_id = queryParams.get("email_id");

    // decode
    var decoded = jwt.decode(email_id, secret).email;

    this.setState({
      ...this.state,
      tid: tid,
      email_id: decoded,
    });
  }

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { name, email_id, feedback, rating, tid } = this.state;

    const body = JSON.stringify({
      email_id,
      tid,
      name,
      feedback,
      rating,
    });

    try {
      const res = await axios.post("/api/tutors/rate", body, config);
      this.props.setAlert("Thanks for feedback.", "success");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => this.props.setAlert(err.msg, "danger"));
      }
    }
  };

  handleRating = (rate) => {
    this.setState({
      ...this.state,
      rating: rate / 20,
    });
  };

  render() {
    return (
      <div>
        <Alert />
        <h1 className='large primary-text'>Feedback form</h1>
        <form
          className='form border border-3 p-3'
          onSubmit={(event) => this.onSubmitHandler(event)}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter your name'
              onChange={(e) => this.onChangeHandler(e)}
              name='name'
              required
            />
          </div>
          <div className='form-group'>
            <textarea
              name='feedback'
              cols='30'
              rows='5'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Feedback'
            ></textarea>
          </div>
          <div className='form-group'>
            Rate:{" "}
            <Rating
              onClick={this.handleRating}
              ratingValue={this.state.rating}
              allowHalfIcon
              allowHover
              showTooltip
            />
          </div>
          <input type='submit' className='btn btn-primary my-1' />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg, type) => dispatch(action.setAlert(msg, type)),
  };
};

export default connect(null, mapDispatchToProps)(Rate);
