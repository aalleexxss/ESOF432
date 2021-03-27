import React, { Component } from 'react';
import vid from './video.gif';
import './index.css'

import Comment from './Comment';
import AddComment from './AddComment';
import ApiService from './apiService';

class App extends Component {
	state = {
		comments: [],
    refinedComments: [],
    users: [["Alfred", "85af2c11-9ec1-4d1a-a1f7-90f05cffc73c"],
            ["Rodger", "1454bb0c-d9df-4bb6-9599-887d60d2f748"],
            ["Lindsay", "6d22a6c9-65cc-4a1a-a509-baf59885feeb"],
            ["Quincy", "a4c083eb-b8cd-4669-8a54-ac14fd567129"],
            ["Jeff", "c2d5c3db-8288-4761-bf6f-a99e06ea2982"]
    ],
		showCreateCommentForm: false
	};

	constructor(props) {
		super(props);

		this.apiService = new ApiService();
	}

	componentWillMount() {
		this.fetchComments();

	}

  refineComments = (comments) => {

    var c = []

	  for(let i=0; i < comments.length; i++)
    {
      if(comments[i].parent_id === null)
      {
        c.push(comments[i])
      }
    }

	  this.setState({refinedComments: c})

  }


	fetchComments = () =>
		this.apiService.getComments().then(({ data }) => {
			this.setState({
        comments: data.comments
			});
      this.refineComments(this.state.comments)
    });

  storeComment = (data) => {
    this.apiService.storeComment(data)
      .then(() => {
        this.fetchComments()
        this.toggleShowCreateCommentForm()
      })
  }

  deleteComment = (comment_id) => {
    this.apiService.deleteComment(comment_id)
      .then(() => {
        this.fetchComments()
      })
  }

  addLike = (comment_id) => {
    this.apiService.addLike(comment_id)
      .then(() => {
        this.fetchComments()
      })
  }

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


	toggleShowCreateCommentForm = () => {
		this.setState({
			showCreateCommentForm: !this.state.showCreateCommentForm
		});
	};

	render() {
		return (
			<div className="container">
        <br/>
        <img src={vid} alt="video" className="vid"/>
        <br/>
				<div className="text-center mb-5">
					<button
						className={`btn ${this.state.showCreateCommentForm ? 'btn-danger' : 'btn-info'}`}
						onClick={this.toggleShowCreateCommentForm}>
						{this.state.showCreateCommentForm ? 'Cancel' : 'Add Comment'}
					</button>
				</div>
				{this.state.showCreateCommentForm && <AddComment storeComment={this.storeComment} users={this.state.users} />}
				{this.state.refinedComments.map((refinedComments) => <Comment deleteComment={this.deleteComment} addLike={this.addLike} getUser={this.getUser} refinedComments={refinedComments} key={refinedComments.comment_id}/>)}
			</div>
		);
	}

}

export default App;
