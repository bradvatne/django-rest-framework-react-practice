import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    })
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.authStart: return authStart(state, action);
        case actionTypes.authSuccess: return authSuccess(state, action);
        case actionTypes.authFail: return authFail(state, action);
        case actionTypes.authLogout: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;