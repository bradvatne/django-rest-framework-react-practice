import * as actionTypes from './actionTypes.js'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogin = (username, password) => {
    return {
        return: dispatch => {
            dispatch(authStart());
            axios.post('http://127.0.0.1:8000/rest-auth/login', {
                username: username,
                password: password
            })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
            })
        }
    }
}

export const signup = (username, email, password1, password2) => {
    return {
        return: dispatch => {
            dispatch(authStart());
            axios.post('http://127.0.0.1:8000/rest-auth/registration', {
                username: username,
                email: email,
                password1: password1,
                password2: password2
            })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
            })
        }
    }
}