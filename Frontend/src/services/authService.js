import axios from 'axios'


const API_URL = 'http://localhost:3008/auth/'

const authService = {
    login: async (email, password) => {
        try {
          const response = await axios.post(`${API_URL}login`, { email, password })
          return response.data.token
        } catch (error) {
          throw error
        }
    },
    register: async (name, email, password) => {
        try {
          const response = await axios.post(`${API_URL}register`, { name, email, password })
          return response.data
        } catch (error) {
          throw error
        }
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('token')
    },
    
    logout: () => {
        localStorage.removeItem('token')
    },
}

export default authService