import axios from 'axios'

const API_URL = '/auth/'

// register a user
const register = async(userData) => {
    const response = await axios.post(API_URL + '/register', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
     return response.data
}

// login user
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
     return response.data
}

// logout
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService