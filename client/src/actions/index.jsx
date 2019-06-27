import {authTypes} from './actionTypes';
import axios from 'axios';
const ROOT_URL = "http://localhost/api";


export const loginUser = data => {
    return {
        type: authTypes.AUTH_USER,
        user: data
    }
}

export const checkAuth = () => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.get(`${ROOT_URL}/auth?token=${token}`)
        .then(res => {
            dispatch({
                type: authTypes.AUTH_USER,
                user: res.data.data.user
            })
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch ({ type: authTypes.LOGOUT });
};

