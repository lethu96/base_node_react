
import * as Types from '../constants/types';


let initialState = {
    fetching: false,
    token: null,
    err: null,
    user: null,
}

const userReducer = (state = [], action) => {
    console.log(action, ' reducer')
    switch (action.type) {
        case Types.ACTION_LOGIN:
            return { ...state, fetching: true };
        case Types.LOGIN_SUCCESS:
            return { ...state, fetching: false, token: action.token };
        case Types.LOGIN_FAIL:
            return { ...state, fetching: false, token: null, error: action.errors };
        case Types.ACTION_REGISTER:
            return { ...state, fetching: true }
        case Types.REGISTER_SUCCESS:
            return { ...state, fetching: false, user: action.user };
        case Types.REGISTER_FAIL:
            return { ...state, user: null, error: action.errors };
        default:
            return state;
    }
}

export default userReducer;