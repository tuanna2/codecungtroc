import {authTypes} from '../actions/actionTypes';

const initialState = {user: null}

export default (state = initialState,action) =>{
    switch (action.type) {
        case authTypes.AUTH_USER:
            return {
                user: action.user
            };
        case authTypes.LOGOUT:
            return {
                user: null,
            }
        default:
            return state;
    }
}