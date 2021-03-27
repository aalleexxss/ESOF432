import React, { Component } from 'react'

import { v4 as uuidv4 } from 'uuid';


import './index.css'

class AddReply extends Component {

  state = {
    body: '',
    //hard coding post id because there's only one post
    post_id: '9ba7b1d5-94e0-41bd-a380-e2f953ffe58c',
    comment_id: uuidv4(),
    parent_id: this.props.parentCommentId,
    likes: 0,
    //Default poster is Alfred b/c he's at the top of the list
    poster: '85af2c11-9ec1-4d1a-a1f7-90f05cffc73c',
    id: '',
    created_at: '',
    updated_at: ''
  }

  handleFieldChange = (comment) => {
    this.setState({
      [comment.target.name]: comment.target.value
    })
  }

  createReply = () => {
    this.props.storeReply(this.state)
  }

  handlePosterChange = (comment) => {
    this.setState({poster: comment.target.value});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="text-center mb-5">Add new Comment</h4>
            <div className="form-group">
              <label>
                Who would you like to post as? &nbsp;&nbsp;&nbsp;
                <select value={this.state.value} onChange={this.handlePosterChange}>
                  <option value="85af2c11-9ec1-4d1a-a1f7-90f05cffc73c">Alfred</option>
                  <option value="1454bb0c-d9df-4bb6-9599-887d60d2f748">Rodger</option>
                  <option value="6d22a6c9-65cc-4a1a-a509-baf59885feeb">Lindsay</option>
                  <option value="a4c083eb-b8cd-4669-8a54-ac14fd567129">Quincy</option>
                  <option value="c2d5c3db-8288-4761-bf6f-a99e06ea2982">Jeff</option>
                </select>
              </label>
              <input name="body" onChange={this.handleFieldChange} type="text" className="form-control" placeholder="Body" />
            </div>
            <div className="form-group text-center">
              <button onClick={this.createReply} className="btn btn-success">Post Reply</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddReply
