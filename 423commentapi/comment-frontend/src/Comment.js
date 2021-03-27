import React, {Component} from 'react';
import './index.css'
import profile from './profile.png';
import AddReply from "./AddReply";
import ApiService from "./apiService";
import Replies from "./Replies";

class Comment extends Component {

  state = {

    replies: [],
    r: [],
    users: [["Alfred", "85af2c11-9ec1-4d1a-a1f7-90f05cffc73c"],
      ["Rodger", "1454bb0c-d9df-4bb6-9599-887d60d2f748"],
      ["Lindsay", "6d22a6c9-65cc-4a1a-a509-baf59885feeb"],
      ["Quincy", "a4c083eb-b8cd-4669-8a54-ac14fd567129"],
      ["Jeff", "c2d5c3db-8288-4761-bf6f-a99e06ea2982"]
    ],
    showReplyForm: false
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

  toggleShowReplyForm = () => {
    this.setState({
      showReplyForm: !this.state.showReplyForm
    });
  };

  getUser = (comment) => {
    const userUuid = comment.poster;
    let i;
    let userName = "";
    for(i=0; i < this.state.users.length; i++)
    {
      if(this.state.users[i][1] === userUuid)
      {
        userName = this.state.users[i][0]
      }
    }
    return userName;
  }

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

  deleteComment = (comment_id) => {
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

  render() {
    return (
      <div className="container">
      <div className="card my-3">
        <div className="card-body">
          <div className="cf">
            <img src={profile} alt="pic" className="pic"/>
            <h2 className="card-title">{this.props.getUser(this.props.refinedComments)}</h2>
          </div>
          <h4 className="card-title">{this.props.refinedComments.body}</h4>
          <button
            className={`btn ${this.state.showReplyForm ? 'btn-danger' : 'btn-warning'}`}
            onClick={this.toggleShowReplyForm}>
            {this.state.showReplyForm ? 'Cancel' : 'Reply'}
          </button>
          <button className="btn-info float-left btn-sm" style={{fontSize: '18px'}}
                  onClick={() => this.props.addLike(this.props.refinedComments.id)}>Likes: {this.props.refinedComments.likes}</button>
          <button className="btn btn-danger float-right btn-sm" style={{fontSize: '18px'}}
                  onClick={() => this.props.deleteComment(this.props.refinedComments.id)}>Delete
          </button>
          <button className="btn btn-primary float-right btn-sm">Edit</button>
        </div>
      </div>
        {this.state.showReplyForm && <AddReply storeReply={this.storeReply} users={this.state.users} parentCommentId={this.props.refinedComments.comment_id} />}
        {this.state.r.map((r) => <Replies deleteComment={this.deleteComment} addLike={this.addLike} getUser={this.getUser} r={r} key={r.comment_id}/>)}

      </div>
    )
  }
}
export default Comment
