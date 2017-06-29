import * as types from '../types';


export default function message(state = {
    data: [],
    type: 'SUCCESS'
}, action = {}) {
    switch (action.type) {
        case types.:
        case types.SIGNUP_SUCCESS_USER:
            return {...state, message: action.message, type: 'SUCCESS'};
        case types.DISMISS_MESSAGE:
            return {...state, message: '', type: 'SUCCESS'};
        default:
            return state;
    }
}
