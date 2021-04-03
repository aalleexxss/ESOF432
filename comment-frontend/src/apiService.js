import axios from 'axios'

export default class ApiService {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://distributed-amp-309017.wm.r.appspot.com/api',
      responseType: "json"
    })
  }

  getComments = async () => {
    return this.http.get(`/comments`)
  }

  // getComment = async (comment_id) => {
  //   return this.http.get(`/comments/${comment_id}`)
  // }

  getReplies = async (comment_id) => {
    return this.http.get(`/comments/replies/${comment_id}`)
  }

  storeComment = async (comment) => {
    return this.http.post(`/comments`, comment)
  }

  updateComment = async (comment) => {
    return this.http.put(`/comments/edit/${comment.id}`, comment)
  }

  deleteComment = async (comment_id) => {
    return this.http.delete(`/comments/${comment_id}`)
  }

  addLike = async (comment_id) => {
    return this.http.put(`/comments/likes/${comment_id}`)
  }


}
