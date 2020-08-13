import axios from 'axios'

const api = axios.create({
  //baseURL: 'http://localhost:3333',
  baseURL: 'https://mentor-do-bem-server.herokuapp.com/', 
})

export default api