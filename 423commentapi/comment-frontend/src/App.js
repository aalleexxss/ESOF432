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
				{this.state.refinedComments.map((refinedComments) => <Comment deleteComment={this.deleteComment} addLike={this.addLike} refinedComments={refinedComments} fetchComments={this.fetchComments} key={refinedComments.comment_id}/>)}
			</div>
		);
	}

}

export default App;
