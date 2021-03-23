import React from 'react';

const Comment = ({ comment, deleteComment }) => ((
  <div className="card my-3">
    <div className="card-body">
      <h4 className="card-title">{comment.body}</h4>
      <h3 className="card-id">{comment.id}</h3>
      <button className="btn btn-danger float-right btn-sm" onClick={() => deleteComment(comment.id)}>Delete</button>
    </div>
  </div>
))

export default Comment
