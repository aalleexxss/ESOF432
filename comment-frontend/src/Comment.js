import React, {Component} from 'react';
import './index.css'
import profile from './profile.png';
import AddReply from "./AddReply";
import ApiService from "./apiService";
import Replies from "./Replies";
import EditComment from "./EditComment"
import Button from "react-bootstrap/Button";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import Swal from "emittery";

class Comment extends Component {

  state = {

    replies: [],
    //r is sorted replies... I think
    r: [],
    showReplyForm: false,
    showEditForm: false
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
      showReplyForm: !this.state.showReplyForm
    });
  };

  toggleShowEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
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
          <button
            className={`btn ${this.state.showReplyForm ? 'btn-danger two' : 'btn-warning'}`}
            onClick={this.toggleShowReplyForm}>
            {this.state.showReplyForm ? 'Cancel' : 'Reply'}
          </button>
          <Button className="btn-info float-left" style={{fontSize: '18px'}}
                  onClick={() => this.props.addLike(this.props.refinedComments.id)} variant="info">Likes: {this.props.refinedComments.likes}</Button>{' '}
          <button className="btn btn-danger delete float-right btn-sm" style={{fontSize: '18px'}}
              onClick={this.submit}
          >Delete
          </button>
          <button className={`btn ${this.state.showEditForm ? 'btn-danger four' : 'btn-primary'}`} onClick={this.toggleShowEditForm}>
            {this.state.showEditForm ? 'Cancel' : 'Edit'}
          </button>

        </div>
      </div>
        {this.state.showEditForm && <EditComment userInfo={this.props.refinedComments} storeEdit={this.storeEdit}/>}
        {this.state.showReplyForm && <AddReply storeReply={this.storeReply}  parentCommentId={this.props.refinedComments.comment_id}/>}
        {this.state.r.map((r) => <Replies deleteReplies={this.deleteReplies} fetchReplies={this.fetchReplies} addLike={this.addLike} r={r} key={r.comment_id}/>)}
      </div>
    )
  }
}

export default Comment
