import * as types from '../../constants/ActionTypes';

const initialState = {
    users: [],
    usersById: []
};

export default function user (state = initialState, action) {
    switch(action.type) {
        case types.SET_USER:
            return {
                ...state,
                users: action.data.users,
                usersById: action.data.usersById
            };
        default:
            return state;
    }
}