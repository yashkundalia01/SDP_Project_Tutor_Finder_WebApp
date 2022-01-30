import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../Store/actions";
import axios from "axios";
import Moment from "react-moment";
import DataTable, { createTheme } from "react-data-table-component";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { CSVLink, CSVDownload } from "react-csv";

const sortIcon = <ArrowDownward />;

class PostList extends Component {
  state = {
    students: null,
    posts: null,
    searchResult: null,
    search: "",
  };

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

  async componentDidMount() {
    const res = await axios.get("/api/students");
    this.setState({
      ...this.state,
      students: res.data,
    });
    let allPosts = this.state.students.map((s) => {
      const email = s.email;
      const name = s.name;
      return s.post != null && s.post != undefined && s.post.length != 0
        ? s.post.map((p) => {
            return {
              title: p.title,
              language: p.language,
              date: p.date.substring(0, 10),
              name: name,
              email: email,
            };
          })
        : null;
    });
    allPosts = allPosts.filter((p) => {
      return p != null;
    });
    this.setState({
      ...this.state,
      posts: this.arr2obj(allPosts),
      searchResult: this.arr2obj(allPosts),
    });
    console.log(this.state.posts);
  }

  onChangeHandler(e) {
    const s = e.target.value;
    if (s == null || s == "")
      this.setState({
        ...this.state,
        searchResult: this.state.posts,
        search: s,
      });
    else {
      const newSearch = this.state.posts.filter((p) => {
        const title = p.title.toUpperCase();
        return title.includes(s.toUpperCase());
      });
      console.log(newSearch);
      this.setState({ ...this.state, searchResult: newSearch, search: s });
    }
  }

  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }
    const columns = [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Language",
        selector: (row) => row.language,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
      },
    ];
    let data = this.state.searchResult;
    const sortIcon = <ArrowDownward />;

    const customStyles = {
      rows: {
        style: {
          minHeight: "72px", // override the row height
          fontSize: "15px",
        },
      },
      headCells: {
        style: {
          paddingLeft: "8px", // override the cell padding for head cells
          paddingRight: "8px",
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      cells: {
        style: {
          paddingLeft: "8px", // override the cell padding for data cells
          paddingRight: "8px",
        },
      },
    };
    let post_table = null;
    if (data != null)
      post_table = (
        <DataTable
          columns={columns}
          data={data}
          pagination
          sortIcon={sortIcon}
          dense
          customStyles={customStyles}
          striped
          highlightOnHover
          pointerOnHover
        />
      );

    let headers = [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Title", key: "title" },
      { label: "Language", key: "language" },
      { label: "Date", key: "date" },
    ];
    let download_csv = null;
    if (this.state.searchResult != null)
      download_csv = (
        <CSVLink data={this.state.searchResult} headers={headers}>
          <i class='fas fa-download'></i> Export CSV
        </CSVLink>
      );

    return (
      <div>
        <h1 className='large primary-text'>Student's Post</h1>
        <form className='form'>
          <div className='form-group'>
            <input
              type={"text"}
              value={this.state.search}
              placeholder=' Search by title'
              onChange={(e) => this.onChangeHandler(e)}
            />
            <br></br>
            <button className='btn btn-dark'>{download_csv}</button>
          </div>
        </form>
        <br></br>
        <div className='table'>{post_table}</div>
      </div>
    );
  }
}

export default PostList;
