import React, {Component} from 'react';
import './index.css'
import profile from './profile.png';
import AddReply from "./AddReply";
import ApiService from "./apiService";
import Replies from "./Replies";
import EditComment from "./EditComment"
import Button from "react-bootstrap/Button";
import { confirmAlert } from 'react-confirm-alert';

class Comment extends Component {

  state = {

    replies: [],
    //r is sorted replies... I think
    r: [],
    showReplyForm: false,
    showEditForm: false,

    showLikes: false,
    showReply: false,
    showEdit: false,
    showDelete: false,
    c : 0
  };

  constructor(props) {
    super(props);
    this.apiService = new ApiService();

  }

  fetchReplies = () =>
    this.apiService.getComments().then(({ data }) => {
      this.setState({
        replies: data.comments
      });
      var newReplies = document.getElementsByClassName("card my-34");
      this.setState({
        c : newReplies.length
      });
      this.findReplies()
    });


  componentWillMount() {
    this.fetchReplies();
  }

  storeReply = (data) => {
    this.apiService.storeComment(data).then(() => {
      this.fetchReplies()
      this.toggleShowReplyForm()
    })
  }

  storeEdit= (data) => {
    this.apiService.updateComment(data).then(() => {
      this.props.fetchComments()
      this.toggleShowEditForm()
    })
  }

  toggleShowReplyForm = () => {
    this.setState({
      showReplyForm: !this.state.showReplyForm,
      showEdit: !this.state.showEdit,
      showLikes: !this.state.showLikes,
      showDelete: !this.state.showDelete
    });
  };

  toggleShowEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm,
      showReply: !this.state.showReply,
      showLikes: !this.state.showLikes,
      showDelete: !this.state.showDelete
    });
  };

  findReplies = () => {

    var rep = []

    for(let i=0; i < this.state.replies.length; i++)
    {
      if(this.state.replies[i].parent_id !== null)
      {
        if(this.props.refinedComments.comment_id === this.state.replies[i].parent_id){

          rep.push(this.state.replies[i]);
        }
      }
    }
    this.setState({r:rep})
    var newReplies = document.getElementsByClassName("card my-34");

    if(this.props.makeNewCommentsDark === true && newReplies.length > this.state.c)
    {
      newReplies[newReplies.length - 1].classList.toggle("dark-mode-replies");
    }
  }

  deleteReplies = (comment_id) => {
    this.apiService.deleteComment(comment_id)
      .then(() => {
        this.fetchReplies()
      })
  }

  addLike = (comment_id) => {
    this.apiService.addLike(comment_id)
      .then(() => {
        this.fetchReplies()
      })
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this comment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteComment(this.props.refinedComments.id)
        },
        {
          label: 'No',
          onClick: () => ""
        }
      ]
    });
  }



  render() {
    return (
      <div className="container comments">
      <div className="card my-3">
        <div className="card-body small">
          <div className="cf">
            <img src={profile} alt="pic" className="pic"/>
            <h2 className="card-title">{this.props.refinedComments.poster_name}</h2>
            <p className="card-title">{this.props.refinedComments.date}</p>
          </div>
          <div className={"text"}>
          <h4 className="card-title body">{this.props.refinedComments.body}</h4>
          </div>
          <button disabled={this.state.showReply}
            className={`btn ${this.state.showReplyForm ? 'btn-danger two' : 'btn-warning'}`}
            onClick={() => {this.toggleShowReplyForm();}}>
            {this.state.showReplyForm ? 'Cancel' : 'Reply'}
          </button>
          <Button disabled={this.state.showLikes} className="btn-info float-left" style={{fontSize: '18px'}}
                  onClick={() => this.props.addLike(this.props.refinedComments.id)} variant="info">Likes: {this.props.refinedComments.likes}</Button>{' '}
          <button disabled={this.state.showDelete} className="btn btn-danger delete float-right btn-sm" style={{fontSize: '18px'}}
              onClick={this.submit}
          >Delete
          </button>
          <button disabled={this.state.showEdit} className={'btn btn-primary'} onClick={this.toggleShowEditForm}>
            Edit
          </button>
        </div>
      </div>
        {this.state.showEditForm && <EditComment cancelButton={this.toggleShowEditForm}  userInfo={this.props.refinedComments} storeEdit={this.storeEdit}/>}
        {this.state.showReplyForm && <AddReply storeReply={this.storeReply} parentCommentId={this.props.refinedComments.comment_id}/>}
        {this.state.r.map((r) => <Replies deleteReplies={this.deleteReplies} fetchReplies={this.fetchReplies} addLike={this.addLike} r={r} key={r.comment_id}/>)}
      </div>
    )
  }
}

export default Comment
