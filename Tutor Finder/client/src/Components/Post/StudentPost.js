import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../Store/actions";


class Post extends Component {
  state = {
    title: "",
    fee: "",
    language: "",
    description: "",
    course: "",

  };

  onChangeHandler = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

  onSubmitHandler = (event) => {
    event.preventDefault();

    const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
      };
    
    this.setState({ ...this.state });
    const { title, fee, language, description, course} =this.state;
    const body = JSON.stringify({
        title,
        fee,
        language,
        description,
        course,
        email: this.props.student.email,
      });
      console.log("on submit");
      const res = axios.post("/api/students/post", body, config);

      this.props.setAlert("Post added");
  };

  render() {
    if (!localStorage.token) {
        return <Redirect to='/' />;
    }
    let post_form = (
      <div>
        <h1 className='large primary-text'>Post Form</h1>
        <p className='lead'>Enter Post Details</p>
        <form className='form' onSubmit={(e) => this.onSubmitHandler(e)}>
          <div className='form-group'>
            <input
              type='text'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Title'
              name='title'
              value={this.state.title}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Fee Value'
              name='fee'
              value={this.state.fee}
              required
            />
          </div>
          <div className='form-group'>
            <select
              id='language'
              name='language'
              onChange={(e) => this.onChangeHandler(e)}
              required
            >
              <option value='' disabled selected hidden>
                Select Language
              </option>
              <option value='English'>English</option>

              <option value='French'>French - français</option>

              <option value='German'>German - Deutsch</option>

              <option value='Gujarati'>Gujarati - ગુજરાતી</option>

              <option value='Hindi'>Hindi - हिन्दी</option>

              <option value='Russian'>Russian - русский</option>

              <option value='Spanish'>Spanish - español</option>
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='course'
              name='course'
              value={this.state.course}
              required
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              onChange={(e) => this.onChangeHandler(e)}
              placeholder='Course Description'
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary'/>
        </form>
      </div>
    );

    return post_form;
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: (msg) => dispatch(action.setAlert(msg, "success")),
  };
};

const mapStateToProps = (state) => ({
  student: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);