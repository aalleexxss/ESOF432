import React, { Component } from 'react'

import './index.css'

class AddComment extends Component {

  state = {
    body: '',
    post_id: '',
    comment_id: '',
    parent_id: '',
    likes: '',
    poster: '',
    id: '',
    created_at: '',
    updated_at: ''
  }

  handleFieldChange = (comment) => {
    this.setState({
      [comment.target.name]: comment.target.value
    })
  }

  createComment = () => {
    this.props.storeComment(this.state)
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
                Who would you like to post as?
                <select value={this.state.value} onChange={this.handlePosterChange}>
                  <option value="85af2c11-9ec1-4d1a-a1f7-90f05cffc73c">Alfred</option>
                  <option value="1454bb0c-d9df-4bb6-9599-887d60d2f748">Rodger</option>
                  <option value="6d22a6c9-65cc-4a1a-a509-baf59885feeb">Lindsay</option>
                  <option value="a4c083eb-b8cd-4669-8a54-ac14fd567129">Quincy</option>
                  <option value="c2d5c3db-8288-4761-bf6f-a99e06ea2982">Jeff</option>
                </select>
              </label>
              <h4 className="card-title">Poster UUID: {this.state.poster}</h4>
              <input name="body" onChange={this.handleFieldChange} type="text" className="form-control" placeholder="Body" />
            </div>
            <div className="form-group text-center">
              <button onClick={this.createComment} className="btn btn-success">Post Comment</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddComment
