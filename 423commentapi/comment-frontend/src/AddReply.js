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
    poster: uuidv4(),
    poster_name: '',
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

  handleKeypress = (e) => {
    if (e.keyCode === 13) {
      this.createReply()
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="text-center mb-5">Add a Reply</h4>
            <div className="form-group">
              <label>
                <input name="poster_name" onChange={this.handleFieldChange} type="text" className="form-control" placeholder="Name" />
              </label>
              <input name="body" onChange={this.handleFieldChange} onKeyDown={this.handleKeypress} type="text" className="form-control" placeholder="Body" />
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
