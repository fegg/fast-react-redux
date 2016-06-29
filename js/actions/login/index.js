import * as types from '../../constants/ActionTypes'
import axios from 'axios'

function fetchUsers () {
    return axios.get('/mock/users.json')
}

export function searchUsers(username) {
    return function (dispatch) {
        return fetchUsers().then(ret => {
            if(ret.status === 200) {
                dispatch(userExists(ret.data, username))
            }
        })
    }
}

export function userExists(data, username) {
    return {
        type: types.USER_EXISTS,
        data,
        username
    }
}