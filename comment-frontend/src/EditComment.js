import React, { Component } from 'react'
import './index.css'
import profile from "./profile.png";
import editing from "./editing2.gif"
import Modal from "./Modal";


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
    updated_at: this.props.userInfo.updated_at,
    errors: {},
    modal: true,
    name: "",
    modalInputName: ""
  }

  handleFieldChange = (comment) => {
    this.setState({
      [comment.target.name]: comment.target.value
    })
  }

  handleValidation(){
    let body = this.state.body;
    let errors = {};
    let formIsValid = true;

    if(body === ""){
      formIsValid = false;
      errors["body"] = "Cannot be empty";
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  createEdit = () => {
    if(this.handleValidation()) {
      this.props.storeEdit(this.state)
    }
  }

  handleKeypress = (e) => {
    if(e.keyCode === 13 && e.shiftKey)
    {
      this.createEdit()
    }
  };

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false
    });
  }

  render() {
    return (
          <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="container edits">
              <div className="card my-3 edits">
                <div className="card-body edits">
                  <div className="cf edits">
                    <img src={profile} alt="pic" className="pic edits"/>
                    <h2 className="card-title edits">{this.props.userInfo.poster_name}</h2>
                    <img src={editing} alt={""} className="edit-wheel"/>
                    <h5>Editing</h5>
                    <textarea className="edit-box" name="body" onKeyDown={this.handleKeypress} onChange={this.handleFieldChange}>{this.props.userInfo.body}</textarea>
                    <span className="error">{this.state.errors["body"]}</span>
                    <button className={'btn btn-danger four' } onClick={this.props.cancelButton}>
                      Cancel
                    </button>
                    <button onClick={this.createEdit} className="btn btn-success edit float-right">Update Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
    );
  }
}

export default EditComment
