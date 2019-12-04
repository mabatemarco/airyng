import axios from 'axios';

const zipURL = 'http://ip-api.com/json'
const nearbyZipApi = 'oUbaIQVCBJn52ff2fq20V65SsYFM6tQHWPsPQqp0EIZOUkZBrLti8vBwDOWMyZ6D'


const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getZip = async () => {
  const response = await axios.get(zipURL)
  const nearby = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/${nearbyZipApi}/radius.json/${response.data.zip}/2/mile`)
  console.log(nearby)
  return nearby.data.zipcodes
}

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', { authentication: loginData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}

export const createSpace = async () => {
  const space=await api.post(/)
}