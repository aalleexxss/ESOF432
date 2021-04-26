import React, { Component } from 'react'

import { v4 as uuidv4 } from 'uuid';
import './index.css'

class AddComment extends Component {

  state = {
    body: '',
    //hard coding post id because there's only one post
    post_id: '9ba7b1d5-94e0-41bd-a380-e2f953ffe58c',
    comment_id: uuidv4(),
    parent_id: '',
    likes: 0,
    poster: uuidv4(),
    poster_name: '',
    id: '',
    created_at: '',
    updated_at: '',
    date: (Date().toLocaleString()).substring(0, 28),
    errors: {}
  }

  handleFieldChange = (comment) => {
    this.setState({
      [comment.target.name]: comment.target.value
    })
  }

  handleValidation(){
    let poster_name = this.state.poster_name;
    let body = this.state.body;
    let errors = {};
    let formIsValid = true;

    if(poster_name === ""){
      formIsValid = false;
      errors["poster_name"] = "Cannot be empty";
    }

    if(body === ""){
      formIsValid = false;
      errors["body"] = "Cannot be empty ";
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  createComment = () => {
    if(this.handleValidation()){
      this.props.storeComment(this.state)
    }
  }

  handleKeypress = (e) => {
    if(e.keyCode === 13 && e.shiftKey)
    {
      this.createComment()
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="text-center mb-5">Add new Comment</h4>
            <div className="form-group">
              <label>
                <input name="poster_name" onChange={this.handleFieldChange} onKeyDown={this.handleKeypress} type="text" className="form-control" placeholder="Name"/>
                <span className="error">{this.state.errors["poster_name"]}</span>
              </label>
              <textarea cols={"40"} rows={"5"} name="body" onChange={this.handleFieldChange} onKeyDown={this.handleKeypress} type="text" className="form-control body" placeholder="Body"/>
              <span className="error">{this.state.errors["body"]}</span>
              <h7>Press Enter + Shift to quick submit comment</h7>
            </div>
              <button className="btn btn-success" style={{float: "right"}} onClick={this.createComment}>Post Comment</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddComment
