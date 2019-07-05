
import * as Types from '../constants/types';


export const login = (user) => {
    return {
        type: Types.ACTION_LOGIN,
        user
    }
}

export const register = (user) => {
    return {
        type: Types.ACTION_REGISTER,
        user
    }
}

