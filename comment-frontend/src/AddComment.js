import React, { Component } from 'react'

import { v4 as uuidv4 } from 'uuid';
import './index.css'

class AddComment extends Component {

  state = {
    //Hard coded so there will always be something in that field
    body: '*Poster did not add a body* (Shame them). This is also my cop out for form validation for now, you caught me.',
    //hard coding post id because there's only one post
    post_id: '9ba7b1d5-94e0-41bd-a380-e2f953ffe58c',
    comment_id: uuidv4(),
    parent_id: '',
    likes: 0,
    poster: uuidv4(),
    poster_name: '*Gasp* the poster did not specify their name',
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

   handleKeypress = (e) => {
    if (e.keyCode === 13) {
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
                <input name="poster_name" onChange={this.handleFieldChange} type="text" className="form-control" placeholder="Name" />
              </label>
              <textarea name="body" onChange={this.handleFieldChange} type="text" className="form-control body" placeholder="Body" />
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
