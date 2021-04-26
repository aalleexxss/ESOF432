import React, {Component} from 'react';
import './index.css'
import profile from "./profile.png";
import EditComment from "./EditComment";
import ApiService from "./apiService";
import {confirmAlert} from "react-confirm-alert";



class Replies extends Component {

  state = {
    showEditForm: false,
    showLikes: false,
    showEdit: false,
    showDelete: false
  }

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
  }

  toggleShowEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm,
      showLikes: !this.state.showLikes,
      showDelete: !this.state.showDelete
    });
  };

  storeEdit= (data) => {
    this.apiService.updateComment(data).then(() => {
      this.props.fetchReplies()
      this.toggleShowEditForm()
    })
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this reply?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteReplies(this.props.r.id)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  render() {
    return (
    <div className="container replies">
      <div className="card my-34">
        <div className="card-body">
          <div className="cf">
            <img src={profile} alt="pic" className="pic"/>
            <h2 className="card-title">{this.props.r.poster_name}</h2>
            <p2 className="card-title">{this.props.r.date}</p2>
          </div>
          <h4 className="card-title body">{this.props.r.body}</h4>
          <button disabled={this.state.showLikes} className="btn-info likes btn-sm" style={{fontSize: '18px'}}
                  onClick={() => this.props.addLike(this.props.r.id)}>Likes: {this.props.r.likes}</button>
          <button disabled={this.state.showDelete} className="btn btn-danger float-right btn-sm" style={{fontSize: '18px'}}
                  onClick={this.submit}>Delete
          </button>
          <button disabled={this.state.showEdit} className={'btn btn-primary two'} onClick={this.toggleShowEditForm}>
            Edit
        </button>
        </div>
      </div>
      {this.state.showEditForm && <EditComment cancelButton={this.toggleShowEditForm} userInfo={this.props.r} storeEdit={this.storeEdit}/>}
    </div>
    )
  }
}

export default Replies
