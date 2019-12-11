import axios from 'axios';

const zipURL = 'http://ip-api.com/json'
const nearbyZipApi = 'oUbaIQVCBJn52ff2fq20V65SsYFM6tQHWPsPQqp0EIZOUkZBrLti8vBwDOWMyZ6D'


const baseUrl='https://airyng.herokuapp.com'
// const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})



export const getZip = async () => {
  const response = await axios.get(zipURL)
  // const nearby = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/${nearbyZipApi}/radius.json/${response.data.zip}/2/mile`)
  // console.log(nearby)
  return response.data.zip
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

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const editUser = async (id, userData) => {
  const user = await api.put(`users/${id}`, {user:userData})
}

export const deleteUser = async (id) => {
  const user = await api.delete(`/users/${id}`)
}

export const allSpaces = async () => {
  const response = await api.get('/spaces');
  return response.data
}

export const oneSpace = async (id) => {
  const response = await api.get(`/spaces/${id}`)
  return response.data
}

export const createSpace = async (spaceData, images) => {
  const space = await api.post(`/spaces`, { space: spaceData })
  await images.forEach(async (image) => {
    await addPic(space.data.id, image)
  })
}

export const editSpace = async (id, spaceData, images) => {
  const space = await api.put(`/spaces/${id}`, { space: spaceData });
  deletePic(id)
  await images.forEach(async (image) => {
    await addPic(space.data.id, image)
  })
}

export const deleteSpace = async (id) => {
  const space = await api.delete(`/spaces/${id}`)
}

export const addPic = async (id, data) => {
  console.log(data)
  const response = await api.post(`spaces/${id}/pics`, { img_url: data })
}

export const deletePic = async (id) => {
  await api.delete(`/spaces/${id}/pics`)
}

export const createSchedule = async (id, scheduleData) => {
  const response = await api.post(`spaces/${id}/schedules`, scheduleData )
  return response.data
}

export const deleteSchedule = async (spaceId, scheduleId) => {
  const response = await api.delete(`spaces/${spaceId}/schedules/${scheduleId}`)
  return response.data
}

export const editSchedule = async (spaceId, scheduleId, userId) => {
  const response = await api.put(`spaces/${spaceId}/schedules/${scheduleId}`,{user_id:userId})
  return response.data
}