import React, { Component } from 'react';
import './index.css'

import Comment from './Comment';
import AddComment from './AddComment';
import ApiService from './apiService';
import Button from 'react-bootstrap/Button';
import {ButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";

class App extends Component {

	state = {
		comments: [],
    refinedComments: [],
		showCreateCommentForm: false,
		makeNewCommentsDark: false,
		c : 0
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
	  var newComments = document.getElementsByClassName("card my-3");
	  if(this.state.makeNewCommentsDark === true && newComments.length > this.state.c)
	  {
		  newComments[newComments.length - 1].classList.toggle("dark-mode-comments");
	  }
	  this.setState({
		  c : newComments.length
	  });
  }

	fetchComments = () =>
		this.apiService.getComments().then(({ data }) => {
			this.setState({
        comments: data.comments
			});
			var newComments = document.getElementsByClassName("card my-3");
			this.setState({
				c : newComments.length
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
	  var newComments = document.getElementsByClassName("card my-3");
	  this.setState({
		  c : newComments.length
	  });
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

	 darkMode = () => {
		 var background = document.body;
		 var comments = document.getElementsByClassName("card my-3");
		 var replies = document.getElementsByClassName("card my-34");

		 this.setState({
			 makeNewCommentsDark: !this.state.makeNewCommentsDark,
			 c : comments.length
		 });

		 background.classList.toggle("dark-mode");

		 for (var i = 0; i < comments.length; i++) {
				comments[i].classList.toggle("dark-mode-comments");

		 }
		 for (var j = 0; j < replies.length; j++) {
			 replies[j].classList.toggle("dark-mode-replies");
		 }
	}

	render() {
		return (
			<div className="container">
				<h3> <u> PLEASE READ! - </u> </h3>
				<h4>- This site is being used to demonstrate the <u>backend</u> functionality of a comment api.</h4>
				<h4>- Backend functionality includes: Posting a comment, editing a comment, liking a comment, and deleting a comment. </h4>
				<h4>- The video below is a placeholder to show how users can interact with a post using comments.</h4>
					<h4>- Documentation, Cypress Dashboard, and Github may be viewed using these links&nbsp;
						{[DropdownButton].map((DropdownType, idx) => (
							<DropdownType
								as={ButtonGroup}
								key={idx}
								id={`dropdown-button-drop-${idx}`}
								size="sm"
								variant="secondary"
								title="Links"
							>
								<Dropdown.Item href="https://backend-309717.wm.r.appspot.com/docs/">Documentation</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="https://dashboard.cypress.io/projects/racs8y/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D">Cypress Dashboard</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="https://github.com/aalleexxss/ESOF432">Github</Dropdown.Item>
							</DropdownType>
						))}
					</h4>
				<br/>
				<div className={"vid_container"}>
					<iframe title={"Vid"} width="420" height="315" src="https://www.youtube.com/embed/EL-D9LrFJd4" frameBorder="0" allowFullScreen></iframe>
				</div>
        			<br/>
				<div className="text-center mb-5">
					<button
						className={`btn ${this.state.showCreateCommentForm ? 'btn-danger cancel' : 'btn-info two'}`}
						onClick={this.toggleShowCreateCommentForm}>
						{this.state.showCreateCommentForm ? 'Cancel' : 'Add Comment'}
					</button>
					<Button className={"dark"} onClick={this.darkMode} variant="secondary">Toggle dark mode</Button>{' '}
				</div>
				{this.state.showCreateCommentForm && <AddComment storeComment={this.storeComment} users={this.state.users} />}
				{this.state.refinedComments.map((refinedComments) => <Comment makeNewCommentsDark={this.state.makeNewCommentsDark}deleteComment={this.deleteComment} addLike={this.addLike} refinedComments={refinedComments} fetchComments={this.fetchComments} key={refinedComments.comment_id}/>)}
			</div>
		);
	}
}

export default App;
