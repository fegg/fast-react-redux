import * as types from '../../constants/ActionTypes'

const isExists = (data, username) => {
    return data.some(user => {
        return user.username === username
    })
}

export default function login (state = {}, action) {
    switch(action.type) {
        case types.USER_EXISTS:
            return {
                ...state,
                isExists: isExists(action.data, action.username)
            }
        default:
            return state
    }
}