import React, {Component} from 'react';
import './index.css'
import profile from "./profile.png";
import EditComment from "./EditComment";
import ApiService from "./apiService";



class Replies extends Component {

  state = {
    showEditForm: false
  }

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
  }

  toggleShowEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
    });
  };

  storeEdit= (data) => {
    this.apiService.updateComment(data).then(() => {
      this.props.fetchReplies()
      this.toggleShowEditForm()
    })

  }

  render() {
    return (
    <div className="container">
      <div className="card my-34">
        <div className="card-body">
          <div className="cf">
            <img src={profile} alt="pic" className="pic"/>
            <h2 className="card-title">{this.props.r.poster_name}</h2>
          </div>
          <h4 className="card-title">{this.props.r.body}</h4>
          <button className="btn-info" style={{fontSize: '18px'}}
                  onClick={() => this.props.addLike(this.props.r.id)}>Likes: {this.props.r.likes}</button>
          <button className="btn btn-danger float-right btn-sm" style={{fontSize: '18px'}}
                  onClick={() => this.props.deleteReplies(this.props.r.id)}>Delete
          </button>
          <button className={`btn ${this.state.showEditForm ? 'btn-danger three' : 'btn-primary'}`} onClick={this.toggleShowEditForm}>
            {this.state.showEditForm ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>
      {this.state.showEditForm && <EditComment userInfo={this.props.r} storeEdit={this.storeEdit}/>}
    </div>
    )
  }
}
export default Replies
