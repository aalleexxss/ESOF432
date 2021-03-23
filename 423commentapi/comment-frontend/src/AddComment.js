import React, { Component } from 'react'


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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="text-center mb-5">Add new Comment</h4>
            <div className="form-group">
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
