import axios from "axios";

export const login = (user) => axios.post('http://localhost:8000/api/user/login', user, { withCredentials: true })
export const logout = () => axios.post('http://localhost:8000/api/user/logout', {}, { withCredentials: true })
export const getOneUser = (id) => axios.get(`http://localhost:8000/api/user/${id}`, { withCredentials: true })
export const register = (user) => axios.post('http://localhost:8000/api/user/register', user, { withCredentials: true })