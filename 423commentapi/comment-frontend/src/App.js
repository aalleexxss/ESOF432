import React, { Component } from 'react';


import Comment from './Comment';
import AddEvent from './AddComment';
import ApiService from './apiService';

class App extends Component {
	state = {
		comments: [],
		showCreateCommentForm: false
	};

	constructor(props) {
		super(props);

		this.apiService = new ApiService();
	}

	componentWillMount() {
		this.fetchComments();
	}

	fetchComments = () =>
		this.apiService.getComments().then(({ data }) => {
			this.setState({
        comments: data.comments
			});
    });

  storeComment = (data) => {
    this.apiService.storeComment(data)
      .then(() => {
        this.fetchComments()
        this.toggleShowCreateCommentForm()
      })
  }

  deleteComment = (id) => {
    this.apiService.deleteComment(id)
      .then(() => {
        this.fetchComments()
      })
  }

  addLike = (id) => {
    this.apiService.addLike(id)
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
				<h1 className="text-center my-5">Comment Api</h1>
				<div className="text-center mb-5">
					<button
						className={`btn ${this.state.showCreateCommentForm ? 'btn-danger' : 'btn-info'}`}
						onClick={this.toggleShowCreateCommentForm}
					>
						{this.state.showCreateCommentForm ? 'Cancel' : 'Add Comment'}
					</button>
				</div>
				{this.state.showCreateCommentForm && <AddEvent storeComment={this.storeComment} />}
        {this.state.comments.map((comment) => <Comment addLike={this.addLike} comment={comment} key={comment.id} />)}
				{this.state.comments.map((comment) => <Comment deleteComment={this.deleteComment} comment={comment} key={comment.id} />)}
			</div>
		);
	}

}

export default App;
