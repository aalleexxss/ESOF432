import axios from 'axios'

export default class ApiService {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:4004/api'
    })
  }

  getComments = async () => {
    return this.http.get(`/comments`)
  }

  storeComment = async (comment) => {
    return this.http.post(`/comments`, comment)
  }

  deleteComment = async (id) => {
    return this.http.delete(`/comments/${id}`)
  }
}
