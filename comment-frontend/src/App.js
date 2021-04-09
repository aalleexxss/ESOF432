import React, { Component } from 'react';
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

				<h4>This site is used to demonstrate functionality of a comment system. There is a video below to show how users may use comments to interact with a video post. You may view documentation&nbsp;
					<a href="https://backend-309717.wm.r.appspot.com/docs/">here</a>
				</h4>
					<br/>
				<div className={"vid_container"}>
					<iframe title={"Vid"} width="420" height="315" src="https://www.youtube.com/embed/EL-D9LrFJd4" frameBorder="0" allowFullScreen></iframe>
				</div>
        			<br/>
				<div className="text-center mb-5">
					<button
						className={`btn ${this.state.showCreateCommentForm ? 'btn-danger' : 'btn-info two'}`}
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
