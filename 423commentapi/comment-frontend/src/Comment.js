import React from 'react';


const Comment = ({ comment, deleteComment, addLike, getUser, users}) => ((
  <div className="card my-3">
    <div className="card-body">
      <h2 className="card-title">User: {getUser(comment)}</h2>
      <h4 className="card-title">Body: {comment.body}</h4>
      <h3 className="card-title">Likes: {comment.likes}</h3>
      <button className="btn btn-danger float-left btn-sm" onClick={() => addLike(comment.id)}>Like</button>
      <button className="btn btn-danger float-right btn-sm" onClick={() => deleteComment(comment.id)}>Delete</button>
    </div>
  </div>
))

export default Comment
