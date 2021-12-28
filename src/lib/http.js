import axios from 'axios'

const http = axios.create({
    baseURL: process.env.REACT_APP_API
})


const token = localStorage.getItem('TOKEN')

if (token) {
    http.defaults.headers.Authorization = `Bearer ${token}`;
}

export default http