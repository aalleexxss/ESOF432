import React, {Component} from 'react';
import './index.css'
import profile from "./profile.png";



class Replies extends Component {
  render() {
    return (
    <div className="container">
      <div className="card my-34">
        <div className="card-body">
          <div className="cf">
            <img src={profile} alt="pic" className="pic"/>
            <h2 className="card-title">{this.props.getUser(this.props.r)}</h2>
          </div>
          <h4 className="card-title">{this.props.r.body}</h4>
          <button className="btn-info" style={{fontSize: '18px'}}
                  onClick={() => this.props.addLike(this.props.r.id)}>Likes: {this.props.r.likes}</button>
          <button className="btn btn-danger float-right btn-sm" style={{fontSize: '18px'}}
                  onClick={() => this.props.deleteComment(this.props.r.id)}>Delete
          </button>
          <button className="btn btn-primary float-right btn-sm">Edit</button>
        </div>
      </div>
    </div>
    )
  }
}
export default Replies
