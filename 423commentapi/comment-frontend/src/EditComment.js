import React, { Component } from 'react'
import './index.css'
import profile from "./profile.png";

class EditComment extends Component {

  state = {
    body: this.props.userInfo.body,
    //hard coding post id because there's only one post
    post_id: '9ba7b1d5-94e0-41bd-a380-e2f953ffe58c',
    comment_id: this.props.userInfo.comment_id,
    parent_id: this.props.userInfo.parent_id,
    likes: this.props.userInfo.likes,
    poster: this.props.userInfo.poster,
    poster_name: this.props.userInfo.poster_name,
    id: this.props.userInfo.id,
    created_at: this.props.userInfo.created_at,
    updated_at: this.props.userInfo.updated_at
  }

  handleFieldChange = (comment) => {
    this.setState({
      [comment.target.name]: comment.target.value
    })
  }

  createEdit = () => {
    this.props.storeEdit(this.state)
  }

  handleKeypress = (e) => {
    if (e.keyCode === 13) {
      this.createEdit()
    }
  };


  render() {
    return (
      <div className="container edits">
        <div className="card my-3 edits">
          <div className="card-body edits">
            <div className="cf edits">
              <img src={profile} alt="pic" className="pic"/>
              <h2 className="card-title">{this.props.userInfo.poster_name}</h2>
              <textarea className="edit-box" name="body" onKeyDown={this.handleKeypress} onChange={this.handleFieldChange}>{this.props.userInfo.body}</textarea>
              <button onClick={this.createEdit} className="btn btn-success float-right">Update Comment</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditComment
