import axios from 'axios'

const BASE_URL = 'https://theoutlet.onrender.com'

const loginUserService = (data) => axios.post(`${BASE_URL}/login`, data)
const registerUserService = (data) => axios.post(`${BASE_URL}/register`, data)
const getAllUsersService = (jwtToken) => axios.get(`${BASE_URL}/users`, { headers: { Authorization: `Bearer ${jwtToken}` } })
const getActiveUser = (jwtToken) => axios.get(`${BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${jwtToken}` } })
// const getSelectedItem = (id) => axios.get(`${BASE_URL}/users/${id}`)

export {
  loginUserService,
  registerUserService,
  getAllUsersService,
  getActiveUser
  // getSelectedItem
}
